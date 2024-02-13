import { Request, Response } from "express";
const Contract = require("../models/ContractManagementModel");

export const ContactManagement = async (req: Request, res: Response) => {
  const { title, description, link, cta_text, cta_link, isActive, isDeleted } =
    req.body;
  try {
    let imageFileName = null;
    if (req.file) {
      imageFileName = await req.file.filename;
    }
    let contract;
    contract = new Contract({
      title,
      description,
      link,
      image: `${imageFileName}`,
      cta_text,
      cta_link,
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
export const GetContactManagement = async (req: Request, res: Response) => {
  try {
    let getcontract = await Contract.find();
    if (!getcontract) {
      return res
        .status(404)
        .json({ statusCode: 404, msg: "Data not Found", success: false });
    }
    return res
      .status(200)
      .json({ statusCode: 200, data: getcontract, success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
export const deleteContactManagement = async (req: Request, res: Response) => {
  try {
    let getcontract = await Contract.findByIdAndRemove(req.params.id);
    if (!getcontract) {
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
export const updateContactManagement = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    let imageFileName = null;
    if (req.file) {
      imageFileName = await req.file.filename;
      data.image = `${imageFileName}`;
    }
    let getcontract = await Contract.findByIdAndUpdate(
      req.params.id,
      {
        $set: data,
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
