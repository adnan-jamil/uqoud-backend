import { Request, Response } from "express";
const Language = require("../models/LanguageModel");
export const AddLanguage = async (req: Request, res: Response) => {
  const { key, en, ar, isDeleted } = req.body;
  try {
    if (key === "") {
      return res
        .status(400)
        .json({ statusCode: 400, msg: "Key can not be empty", success: false });
    }
    if (en === "") {
      return res.status(400).json({
        statusCode: 400,
        msg: "English can not be empty",
        success: false,
      });
    }
    if (ar === "") {
      return res.status(400).json({
        statusCode: 400,
        msg: "Arabic can not be empty",
        success: false,
      });
    }
    let contract;
    contract = new Language({
      key,
      en,
      ar,
      isDeleted,
    });
    contract = await contract.save();
    if (!contract) {
      return res
        .status(400)
        .json({ msg: "Error while saving", success: false });
    }
    return res
      .status(200)
      .json({ data: contract, msg: "Data saved successfully", success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// get All DATA
export const GetAllLanguage = async (req: Request, res: Response) => {
  try {
    let getcontract = await Language.find();
    if (!getcontract) {
      return res.status(404).json({ msg: "No Data Found", success: false });
    }
    return res
      .status(200)
      .json({ data: getcontract, statusCode: 200, success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
export const deleteLanguage = async (req: Request, res: Response) => {
  try {
    let getcontract = await Language.findByIdAndRemove(req.params.id);
    if (!getcontract) {
      return res.status(404).json({ msg: "Data not found", success: false });
    }
    return res.status(200).json({
      statusCode: 200,
      msg: "Data deleted successfully",
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
export const UpdateLanguage = async (req: Request, res: Response) => {
  try {
    let getcontract = await Language.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!getcontract) {
      return res.status(404).json({ msg: "Data not found", success: false });
    }
    return res.status(200).json({
      statusCode: 200,
      data: getcontract,
      msg: "Data updated successfully",
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
