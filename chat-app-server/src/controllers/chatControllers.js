exports.getMessages = (req, res) => {
    res.status(200).json({
      success: true,
      messages: ["Sample message 1", "Sample message 2"], // This would normally come from a database
    });
};