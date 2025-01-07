const express = require("express");
const { nanoid } = require("nanoid");
const Url = require("../models/Url.model");

const app = express.Router();

app.post("/shorten", async (req, res) => {
    const { originalUrl } = req.body;
  
    if (!originalUrl) return res.status(400).json({ message: "URL is required" });
  
    try {
      const shortId = nanoid(8);
      const newUrl = new Url({ originalUrl, shortId });
      await newUrl.save();
  
      res.status(201).json({ originalUrl, shortUrl: `${process.env.BASE_URL}/url/${shortId}` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.get("/:shortId", async (req, res) => {
    const { shortId } = req.params;
  
    try {
      const url = await Url.findOne({ shortId });
      if (!url) return res.status(404).json({ message: "URL not found" });
  
      res.redirect(url.originalUrl);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

module.exports = app;