import { Request, Response } from "express";
const Products = require("../models/ProductModel");
export const NewProduct = async (req: Request, res: Response) => {
  const {
    title,
    description,
    meta_desc,
    page_title,
    slug,
    checked,
    meta_title,
    tags,
    cta_link,
    cta_text,
    isActive,
    isDeleted,
  } = req.body;
  try {
    if (!tags) {
      return res.status(400).json({
        statusCode: 400,
        msg: "Error while parsing Tags",
        success: false,
      });
    }
    let tagsArray;
    tagsArray = tags.split(",").map((skill: string) => skill.trim());
    const logoFile = await (
      req.files as { [fieldname: string]: Express.Multer.File[] }
    )["logo"]?.[0];
    const backgroundFile = await (
      req.files as { [fieldname: string]: Express.Multer.File[] }
    )["image"]?.[0];
    let product;
    product = new Products({
      title,
      description,
      image: `product/${backgroundFile.filename}`,
      logo: `product/${logoFile.filename}`,
      page_title,
      checked,
      slug,
      meta_desc,
      meta_title,
      tags: tagsArray,
      cta_link,
      cta_text,
      isActive,
      isDeleted,
    });
    product = await product.save();
    if (!product) {
      return res.status(500).json({
        statusCode: 500,
        msg: "Error while saving data",
        success: false,
      });
    }
    return res.status(201).json({
      statusCode: 201,
      data: product,
      msg: "Data Saved successfully",
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// get All DATA
export const Allproducts = async (req: Request, res: Response) => {
  try {
    let allproduct = await Products.find();
    if (!allproduct) {
      return res
        .status(404)
        .json({ statusCode: 404, msg: "Data not Found", success: false });
    }
    return res
      .status(200)
      .json({ statusCode: 200, data: allproduct, success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
export const updateproduct = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    let tagsArray;
    tagsArray = data.tags.split(",").map((skill: string) => skill.trim());
    data.tags = tagsArray;
    if (req.files) {
      const logoFile = (
        req.files as { [fieldname: string]: Express.Multer.File[] }
      )["logo"]?.[0];
      const backgroundFile = (
        req.files as { [fieldname: string]: Express.Multer.File[] }
      )["image"]?.[0];
      if (backgroundFile) {
        data.image = await `product/${backgroundFile.filename}`;
      }
      if (logoFile) {
        data.logo = await `product/${logoFile.filename}`;
      }
    }
    let updateproduct = await Products.findByIdAndUpdate(
      req.params.id,
      {
        $set: data,
      },
      { new: true }
    );
    if (!updateproduct) {
      return res
        .status(404)
        .json({ statusCode: 404, msg: "Data not Found", success: false });
    }
    return res.status(200).json({
      statusCode: 200,
      data: updateproduct,
      msg: "Data updated successfully",
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
export const getsingleproducts = async (req: Request, res: Response) => {
  try {
    let getproductid = await Products.findById(req.params.id);
    if (!getproductid) {
      return res.status(404).json({ msg: "No Data Found" });
    }
    return res.status(200).json({ data: getproductid, success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
export const Deletesingleproducts = async (req: Request, res: Response) => {
  try {
    let getproductid = await Products.findByIdAndRemove(req.params.id);
    if (!getproductid) {
      return res.status(404).json({ statusCode: 404, msg: "No Data Found" });
    }
    return res.status(200).json({
      statusCode: 200,
      msg: "Data deleted successfully",
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({ statusCode: 500, msg: error.message });
  }
};
