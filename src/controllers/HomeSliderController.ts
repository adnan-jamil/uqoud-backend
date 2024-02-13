import { Request, Response } from "express";
const Home = require("../models/HomeSliderModel");
export const addHomeSlider = async (req: Request, res: Response) => {
  const {
    title,
    description,
    link,
    tags,
    cta_text,
    cta_link,
    isActive,
    isDeleted,
  } = req.body;
  try {
    let imageFileName = null;
    if (req.file) {
      imageFileName = await req.file.filename;
    }
    let tagsArray;
    tagsArray = tags.split(",").map((skill: string) => skill.trim());
    let home;
    home = new Home({
      title,
      description,
      link,
      image: `${imageFileName}`,
      tags: tagsArray,
      cta_text,
      cta_link,
      isActive,
      isDeleted,
    });
    home = await home.save();
    if (!home) {
      return res.status(500).json({
        statusCode: 500,
        msg: "Error while saving data",
        success: false,
      });
    }
    return res.status(201).json({
      statusCode: 201,
      data: home,
      msg: "Data Saved successfully",
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// get All DATA
export const GetHomeSlider = async (req: Request, res: Response) => {
  try {
    let gethome = await Home.find();
    if (!gethome) {
      return res
        .status(404)
        .json({ statusCode: 404, msg: "Data not Found", success: false });
    }
    return res
      .status(200)
      .json({ statusCode: 200, data: gethome, success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
export const GetSingleSlider = async (req: Request, res: Response) => {
  try {
    let getsingle = await Home.findById(req.params.id);
    if (!getsingle) {
      return res
        .status(404)
        .json({ statusCode: 404, msg: "Data not Found", success: false });
    }
    return res
      .status(200)
      .json({ statusCode: 200, data: getsingle, success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
export const updateHomeSlider = async (req: Request, res: Response) => {
  try {
    let data = req.body;
    let imageFileName = null;
    if (req.file) {
      imageFileName = await req.file.filename;
      data.image = `${imageFileName}`;
    }
    let tagsArray = req.body.tags
      .split(",")
      .map((skill: string) => skill.trim());
    data.tags = tagsArray;
    let gethome = await Home.findByIdAndUpdate(
      req.params.id,
      {
        $set: data,
      },
      { new: true }
    );
    if (!gethome) {
      return res
        .status(404)
        .json({ statusCode: 404, msg: "Data not Found", success: false });
    }
    return res.status(200).json({
      statusCode: 200,
      data: gethome,
      msg: "Data updated successfully",
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
