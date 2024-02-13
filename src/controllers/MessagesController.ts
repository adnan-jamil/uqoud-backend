"use strict";

import { Request, Response } from "express";

Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessage = exports.GetAllmessage = exports.sendMessage = void 0;
const Messages = require("../models/MessagesModel");
const { validationResult } = require("express-validator");
export const sendMessage = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ statusCode: 400, success: false, msg: errors.array()[0].msg });
  }
  const { name, message, product, email, phone, isActive, isDeleted } =
    req.body;
  try {
    let contract;
    contract = new Messages({
      name,
      message,
      product,
      email,
      phone,
      isActive,
      isDeleted,
    });
    contract = await contract.save();
    if (contract) {
      return res
        .status(200)
        .json({ msg: "Message sent successfully", success: true });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const GetAllmessage = async (req: Request, res: Response) => {
  try {
    let getcontract = await Messages.find();
    if (!getcontract) {
      return res.status(404).json({ msg: "No Data Found", success: false });
    }
    return res.status(200).json({
      data: getcontract,
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
export const deleteMessage = async (req: Request, res: Response) => {
  try {
    let getcontract = await Messages.findByIdAndRemove(req.params.id);
    if (!getcontract) {
      return res.status(404).json({ msg: "Data not found", success: false });
    }
    return res.status(200).json({ msg: "Data deleted", success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
