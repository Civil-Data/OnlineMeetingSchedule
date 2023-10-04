const Meeting = require("../models/meeting.model");

module.exports.GetMeeting = async (req, res) => {
    try {
        const { meetingID } = req.body;

        const meeting = await Meeting.findOne({
            _id: meetingID,
        });

        res.status(200).json(meeting);
    } catch (error) {
        console.error("Unable to find meeting.", error);
    }
};

module.exports.Create = async (req, res, next) => {
    try {
        const {
            organizer,
            participants,
            startTime,
            endTime,
            startDate,
            endDate,
            location,
            title,
            description,
        } = req.body;

        const meeting = await Meeting.create({
            organizer,
            participants,
            startTime,
            endTime,
            startDate,
            endDate,
            location,
            title,
            description,
        });

        res.status(201).json({
            message: "Meeting was successfully created!",
            meeting,
        });
        next();
    } catch (error) {
        console.error("Unable to create meeting.", error);
    }
};

module.exports.Update = async (req, res, next) => {
    try {
        const {
            meetingID,
            participants,
            startTime,
            endTime,
            startDate,
            endDate,
            location,
            title,
            description,
        } = req.body;

        const meeting = await Meeting.updateOne(
            {
                _id: meetingID,
            },
            {
                participants,
                startTime,
                endTime,
                startDate,
                endDate,
                location,
                title,
                description,
            }
        );

        res.status(200).json({
            message: "Meeting was successfully updated!",
            meeting,
        });
        next();
    } catch (error) {
        console.error("Unable to update meeting.", error);
    }
};

module.exports.Delete = async (req, res, next) => {
    try {
        const { meetingID } = req.body;

        const meeting = await Meeting.deleteOne({ _id: meetingID });
        console.log("Deleted:", meeting);

        res.status(200).json({
            message: "Meeting was successfully deleted!",
        });
        next();
    } catch (error) {
        console.error("Unable to delete meeting.", error);
    }
};
