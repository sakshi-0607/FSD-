const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Registration = require("../models/Registration");
const Event = require("../models/Event");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// POST /api/registrations - Register current user for an event
router.post("/", protect, async (req, res) => {
  try {
    const eventId = req.body.eventId || req.body.event;

    if (!eventId || !mongoose.isValidObjectId(eventId)) {
      return res.status(400).json({
        message: "Valid event ID is required",
      });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    const existingRegistration = await Registration.findOne({
      user: req.user._id,
      event: eventId,
    });

    if (existingRegistration) {
      return res.status(400).json({
        message: "You are already registered for this event",
      });
    }

    const registration = await Registration.create({
      user: req.user._id,
      event: eventId,
    });

    await registration.populate("event");

    res.status(201).json({
      message: "Successfully registered for event",
      registration,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "You are already registered for this event",
      });
    }
    console.error("Registration error:", error.message);
    res.status(500).json({
      message: "Failed to register for event",
    });
  }
});

// GET /api/registrations/my - Get current user's registrations
router.get("/my", protect, async (req, res) => {
  try {
    const registrations = await Registration.find({
      user: req.user._id,
    })
      .populate("event")
      .sort({ createdAt: -1 });

    res.status(200).json(registrations);
  } catch (error) {
    console.error("Error retrieving user registrations:", error.message);
    res.status(500).json({
      message: "Failed to retrieve registrations",
    });
  }
});

// DELETE /api/registrations/:eventId - Cancel registration
router.delete("/:eventId", protect, async (req, res) => {
  try {
    const { eventId } = req.params;

    let query = { user: req.user._id };
    if (mongoose.isValidObjectId(eventId)) {
      query.$or = [{ event: eventId }, { _id: eventId }];
    } else {
      return res.status(400).json({
        message: "Invalid event or registration ID",
      });
    }

    const deleted = await Registration.findOneAndDelete(query);

    if (!deleted) {
      return res.status(404).json({
        message: "Registration not found",
      });
    }

    res.status(200).json({
      message: "Registration cancelled successfully",
    });
  } catch (error) {
    console.error("Error cancelling registration:", error.message);
    res.status(500).json({
      message: "Failed to cancel registration",
    });
  }
});

// GET /api/registrations - Admin view of all registrations
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const registrations = await Registration.find()
      .populate("user", "name email role")
      .populate("event")
      .sort({ createdAt: -1 });

    res.status(200).json(registrations);
  } catch (error) {
    console.error("Error retrieving all registrations:", error.message);
    res.status(500).json({
      message: "Failed to retrieve registrations",
    });
  }
});

module.exports = router;

