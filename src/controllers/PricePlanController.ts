import { Request, Response } from "express";
const PricePage = require("../models/PricePageModel");
const PricePlan = require("../models/PricePlanModel");
export const AddPricePlan = async (req: Request, res: Response) => {
  const {
    title,
    other_description,
    price,
    cta_text,
    cta_link,
    plan_description,
    features,
    price_id,
    isActive,
    isDeleted,
  } = req.body;
  let tagsArray: string[] = [];
  try {
    if (!title) {
      return res
        .status(400)
        .json({ statusCode: 400, msg: "Please enter title" });
    }
    if (!plan_description) {
      return res
        .status(400)
        .json({ statusCode: 400, msg: "Please enter description" });
    }
    if (!price_id) {
      return res.status(400).json({ statusCode: 400, msg: "Invalid Id" });
    }
    if (!features) {
      return res
        .status(400)
        .json({ statusCode: 400, msg: "Features can't be null" });
    } else {
      tagsArray = features.split(",").map((skill: string) => skill.trim());
    }
    const findmodel = await PricePage.find({ price_id });
    if (!findmodel) {
      return res
        .status(400)
        .json({ statusCode: 400, msg: "Error while saving" });
    }
    let work;
    work = new PricePlan({
      title,
      plan_description,
      other_description,
      price,
      cta_text,
      cta_link,
      features: tagsArray,
      price_id,
      isActive,
      isDeleted,
    });
    work = await work.save();
    if (!work) {
      return res.status(500).json({
        statusCode: 500,
        msg: "Error while saving new Work",
        success: false,
      });
    }
    return res.status(201).json({
      statusCode: 201,
      data: work,
      msg: "Data Saved successfully",
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// get All DATA
export const GetPricePlan = async (req: Request, res: Response) => {
  try {
    let getwork = await PricePlan.find();
    if (!getwork) {
      return res
        .status(404)
        .json({ statusCode: 404, msg: "Data not found", success: false });
    }
    return res
      .status(200)
      .json({ statusCode: 200, data: getwork, success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
export const updatePricePlan = async (req: Request, res: Response) => {
  try {
    let updateData = req.body;
    if (updateData.title === "" || updateData.plan_description === "") {
      return res.status(400).json({
        statusCode: 400,
        msg: "Please fill all fields",
        success: false,
      });
    }
    if (!updateData) {
      return res
        .status(400)
        .json({ statusCode: 400, msg: "data can't be null" });
    } else {
      updateData.features = updateData.features
        .split(",")
        .map((skill: string) => skill.trim());
    }
    let getwork = await PricePlan.findByIdAndUpdate(
      req.params.id,
      {
        $set: updateData,
      },
      { new: true }
    );
    if (!getwork) {
      return res.status(404).json({ statusCode: 404, msg: "No Data Found" });
    }
    return res.status(200).json({
      statusCode: 200,
      data: getwork,
      msg: "Data Updated successfully",
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
export const deletePricePlan = async (req: Request, res: Response) => {
  try {
    let getworkdel = await PricePlan.findByIdAndRemove(req.params.id);
    if (!getworkdel) {
      return res.status(404).json({ statusCode: 404, msg: "No Data Found" });
    }
    return res.status(200).json({
      statusCode: 200,
      msg: "Item Deleted successfully",
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
