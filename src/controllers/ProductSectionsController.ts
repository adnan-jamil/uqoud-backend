import { Request, Response } from "express";
const ProductSection = require("../models/ProductSectionsModel");
const Products = require("../models/ProductModel");
export const NewSection = async (req: Request, res: Response) => {
  const {
    title,
    description,
    typeofsection,
    link,
    tags,
    isActive,
    productId,
    isDeleted,
  } = req.body;
  try {
    const oldproduct = await Products.findById(productId);
    if (!oldproduct) {
      return res.status(404).json({ msg: "No Product Found", success: false });
    }
    let tagsArray;
    tagsArray = tags.split(",").map((skill: string) => skill.trim());
    let imageFileName = null;
    if (req.file) {
      imageFileName = await req.file.filename;
    }
    let productsec;
    productsec = new ProductSection({
      title,
      description,
      image: `productItems/${imageFileName}`,
      productId: oldproduct.id,
      tags: tagsArray,
      typeofsection,
      link,
      isActive,
      isDeleted,
    });
    productsec = await productsec.save();
    if (!productsec) {
      return res.status(500).json({
        statusCode: 500,
        error: "Failed to create new Items",
        success: false,
      });
    }
    return res.status(201).json({
      statusCode: 201,
      data: productsec,
      msg: "Data Saved successfully",
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// get All DATA
export const AllSection = async (req: Request, res: Response) => {
  try {
    let allsection = await ProductSection.find();
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
export const getSectionById = async (req: Request, res: Response) => {
  try {
    let allsection = await ProductSection.find({ productId: req.params.id });
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
export const getSingleSection = async (req: Request, res: Response) => {
  try {
    let allsection = await ProductSection.findById(req.params.id);
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
export const updateSection = async (req: Request, res: Response) => {
  try {
    let data = req.body;
    if (req.file) {
      data.image = `productItems/${req.file.filename}`;
    }
    let updatesec = await ProductSection.findByIdAndUpdate(req.params.id, {
      $set: data,
    });
    if (!updatesec) {
      return res
        .status(404)
        .json({ statusCode: 404, msg: "Data not Found", success: false });
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
export const getproductbyId = async (req: Request, res: Response) => {
  try {
    let getsectid = await ProductSection.findById(req.params.id);
    if (!getsectid) {
      return res
        .status(404)
        .json({ statusCode: 404, msg: "Data not Found", success: false });
    }
    return res
      .status(200)
      .json({ statusCode: 200, data: getsectid, success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteSection = async (req: Request, res: Response) => {
  try {
    let sectiondel = await ProductSection.findByIdAndRemove(req.params.id);
    if (!sectiondel) {
      return res
        .status(404)
        .json({ statusCode: 404, msg: "No Data Found", success: false });
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
