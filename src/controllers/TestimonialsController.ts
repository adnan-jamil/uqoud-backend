import { Request, Response } from "express";
const Testimonials = require("../models/TestimonialModel");
export const NewTestimonial = async (req: Request, res: Response) => {
  const { title, description, review_by, review_from, isActive, isDeleted } =
    req.body;
  try {
    let imageFileName = null;
    if (req.file) {
      imageFileName = await req.file.filename;
    }
    let productsec;
    productsec = new Testimonials({
      title,
      description,
      image: `testimonials/${imageFileName}`,
      review_from,
      review_by,
      isActive,
      isDeleted,
    });
    productsec = await productsec.save();
    if (!productsec) {
      return res.status(500).json({
        statusCode: 500,
        msg: "Failed to create new Items",
        success: false,
      });
    }
    return res.status(201).json({
      statusCode: 201,
      productsec,
      msg: "Data Saved successfully",
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// get All DATA
export const AllTestimonial = async (req: Request, res: Response) => {
  try {
    let allsection = await Testimonials.find();
    if (!allsection) {
      return res
        .status(404)
        .json({ statusCode: 404, msg: "Data not Found", success: false });
    }
    return res
      .status(200)
      .json({ statusCode: 200, data: allsection, success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
export const updateTestimonial = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    let imageFileName = null;
    if (req.file) {
      imageFileName = await req.file.filename;
      data.image = `testimonials/${imageFileName}`;
    }
    let updatesec = await Testimonials.findByIdAndUpdate(req.params.id, {
      $set: data,
    });
    if (!updatesec) {
      return res
        .status(404)
        .json({ statusCode: 404, msg: "No Data Found", success: false });
    }
    return res.status(200).json({
      statusCode: 200,
      data: updatesec,
      msg: "Data updated successfully",
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
export const getTestimonialbyId = async (req: Request, res: Response) => {
  try {
    let getsectid = await Testimonials.findById(req.params.id);
    if (!getsectid) {
      return res.status(404).json({ statusCode: 404, msg: "No Data Found" });
    }
    return res
      .status(200)
      .json({ statusCode: 404, data: getsectid, success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteTestimonial = async (req: Request, res: Response) => {
  try {
    let sectiondel = await Testimonials.findByIdAndRemove(req.params.id);
    if (!sectiondel) {
      return res.status(404).json({ msg: "No Data Found" });
    }
    return res
      .status(200)
      .json({ msg: "Data deleted successfully", success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
