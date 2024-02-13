import { Request, Response } from "express";
const Contract_Focuses = require("../models/Contract_Focuses");

export const ContactFocus = async (req: Request, res: Response) => {
  const { title, description, isActive, isDeleted } = req.body;
  if (title == null || description == null) {
    return res.status(400).json({
      statusCode: 400,
      msg: "title and description can not be empty",
      success: false,
    });
  }
  try {
    let contract;
    contract = new Contract_Focuses({
      title,
      description,
      isActive,
      isDeleted,
    });
    contract = await contract.save();
    if (!contract) {
      return res
        .status(500)
        .json({ statusCode: 500, msg: "Error while saving", success: false });
    }
    return res.status(201).json({
      statusCode: 201,
      data: contract,
      msg: "Data Saved successfully",
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// get All DATA
export const GetContactFocus = async (req: Request, res: Response) => {
  try {
    let getcontract = await Contract_Focuses.find();
    if (!getcontract) {
      return res.status(404).json({ statusCode: 404, error: "No Data Found" });
    }
    return res
      .status(200)
      .json({ statusCode: 200, data: getcontract, success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
export const deleteFocuses = async (req: Request, res: Response) => {
  try {
    let delfocus = await Contract_Focuses.findByIdAndRemove(req.params.id);
    if (!delfocus) {
      return res
        .status(404)
        .json({ statusCode: 404, msg: "Data not found", success: false });
    }
    return res.status(200).json({
      statusCode: 200,
      msg: "Data Deleted successfully",
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
export const UpdateFocuses = async (req: Request, res: Response) => {
  try {
    let updatefocu = await Contract_Focuses.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!updatefocu) {
      return res
        .status(404)
        .json({ statusCode: 404, msg: "Data not found", success: false });
    }

    return res.status(200).json({
      statusCode: 200,
      data: updatefocu,
      msg: "Data Updated successfully",
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
