import { Request, Response } from "express";
const ContactInfo = require("../models/ContactInfoModel");
export const AddNewContactInfo = async (req: Request, res: Response) => {
  const { support_email, business_email, phone, Address, isActive, isDeleted } =
    req.body;
  try {
    let contract;
    contract = new ContactInfo({
      support_email,
      business_email,
      phone,
      Address,
      isActive,
      isDeleted,
    });
    contract = await contract.save();
    if (!contract) {
      return res.status(500).json({
        statusCode: 500,
        msg: "Error while saving contact info",
        success: false,
      });
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
export const GetContactInfo = async (req: Request, res: Response) => {
  try {
    let getcontract = await ContactInfo.find();
    if (!getcontract) {
      return res
        .status(404)
        .json({ statusCode: 404, msg: "Data not found", success: false });
    }
    return res
      .status(200)
      .json({ statusCode: 200, data: getcontract, success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateContactInfo = async (req: Request, res: Response) => {
  try {
    let getcontract = await ContactInfo.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!getcontract) {
      return res
        .status(404)
        .json({ statusCode: 404, msg: "Data not found", success: false });
    }

    return res.status(200).json({
      statusCode: 200,
      data: getcontract,
      msg: "Data Updated successfully",
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
