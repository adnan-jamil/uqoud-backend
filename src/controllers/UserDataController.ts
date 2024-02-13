import { Request, Response } from "express";
const HomeSlider = require("../models/HomeSliderModel");
const HowItWork = require("../models/HowItWorkModel");
const Challenge = require("../models/ChallengesModel");
const ContractMNG = require("../models/ContractManagementModel");
const OurFocus = require("../models/Contract_Focuses");
const UseCase = require("../models/UseCaseModel");
const Testimonial = require("../models/TestimonialModel");
const Brand = require("../models/CompanybrandModel");
const Conpany = require("../models/CompanyModel");
const Price = require("../models/PricePageModel");
const Product = require("../models/ProductModel");
const ContactInfo = require("../models/ContactInfoModel");
const ProductSection = require("../models/ProductSectionsModel");
const Language = require("../models/LanguageModel");
const FAQmodel = require("../models/FAQsModel");
export const userHomePage = async (req: Request, res: Response) => {
  try {
    const homeSlider = await HomeSlider.find();
    const howItWork = await HowItWork.find();
    const challenge = await Challenge.aggregate([
      {
        $lookup: {
          from: "carditems",
          localField: "_id",
          foreignField: "challengeID",
          as: "challengeCards",
        },
      },
    ]);
    const contractMNG = await ContractMNG.find();
    const ourFocus = await OurFocus.find();
    const useCase = await UseCase.find();
    const testimonial = await Testimonial.find();
    const brand = await Brand.find();

    if (
      homeSlider &&
      howItWork &&
      challenge &&
      contractMNG &&
      ourFocus &&
      useCase &&
      testimonial &&
      brand
    ) {
      res.status(200).json({
        homeSlider,
        howItWork,
        challenge,
        contractMNG,
        ourFocus,
        useCase,
        testimonial,
        brand,
        success: true,
        statusCode: 200,
      });
    } else {
      res.status(400).json({
        success: false,
        statusCode: 400,
        msg: "something went wrong",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
      success: false,
      statusCode: 500,
    });
  }
};
export const getUserAbout = async (req: Request, res: Response) => {
  try {
    const about = await Conpany.aggregate([
      {
        $lookup: {
          from: "abouttools",
          localField: "_id",
          foreignField: "AboutId",
          as: "aboutTools",
        },
      },
      {
        $lookup: {
          from: "brands",
          localField: "_id",
          foreignField: "AboutId",
          as: "Brands",
        },
      },
      {
        $lookup: {
          from: "teches",
          localField: "_id",
          foreignField: "AboutId",
          as: "AboutTech",
        },
      },
      {
        $lookup: {
          from: "techcards",
          localField: "AboutTech._id",
          foreignField: "techID",
          as: "TechCards",
        },
      },
      {
        $lookup: {
          from: "values",
          localField: "_id",
          foreignField: "AboutId",
          as: "AboutValue",
        },
      },
    ]);
    const testimonial = await Testimonial.find();
    if (about && testimonial) {
      res.status(200).json({
        about,
        testimonial,
        success: true,
        statusCode: 200,
      });
    } else {
      res.status(400).json({
        success: false,
        statusCode: 400,
        msg: "something went wrong",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
      success: false,
      statusCode: 500,
    });
  }
};

export const getUserPrice = async (req: Request, res: Response) => {
  try {
    const price = await Price.aggregate([
      {
        $lookup: {
          from: "priceplans",
          localField: "_id",
          foreignField: "price_id",
          as: "pricePlans",
        },
      },
      {
        $lookup: {
          from: "supports",
          localField: "_id",
          foreignField: "price_id",
          as: "priceSupport",
        },
      },
    ]);
    const brand = await Brand.find();
    if (price && brand) {
      res.status(200).json({
        price,
        brand,
        success: true,
        statusCode: 200,
      });
    } else {
      res.status(400).json({
        success: false,
        statusCode: 400,
        msg: "something went wrong",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
      success: false,
      statusCode: 500,
    });
  }
};

export const getUserProduct = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug;
    const product = await Product.findOne({ slug });
    const products: [any] = await Product.find();

    if (product) {
      const proSection = await ProductSection.find({ productId: product._id });
      const proFAQ = await FAQmodel.find({ productId: product._id });
      const index = products.findIndex(
        (item: { slug: string }) => item.slug === slug
      );
      const testimonial = await Testimonial.find();
      const brand = await Brand.find();
      res.status(200).json({
        product,
        index,
        proSection,
        proFAQ,
        testimonial,
        brand,
        success: true,
        statusCode: 200,
      });
    } else {
      res.status(400).json({
        success: false,
        statusCode: 400,
        msg: "something went wrong",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
      success: false,
      statusCode: 500,
    });
  }
};
export const getUserProductdata = async (req: Request, res: Response) => {
  try {
    const product = await Product.find();
    if (product) {
      res.status(200).json({
        product,
        success: true,
        statusCode: 200,
      });
    } else {
      res.status(400).json({
        success: false,
        statusCode: 400,
        msg: "something went wrong",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
      success: false,
      statusCode: 500,
    });
  }
};

export const getUserContact = async (req: Request, res: Response) => {
  try {
    const contact = await ContactInfo.find();
    if (contact) {
      res.status(200).json({
        contact,
        success: true,
        statusCode: 200,
      });
    } else {
      res.status(400).json({
        success: false,
        statusCode: 400,
        msg: "something went wrong",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
      success: false,
      statusCode: 500,
    });
  }
};
export const getUserTranslation = async (req: Request, res: Response) => {
  try {
    const language = await Language.find();
    if (language) {
      res.status(200).json({
        language,
        success: true,
        statusCode: 200,
      });
    } else {
      res.status(400).json({
        success: false,
        statusCode: 400,
        msg: "something went wrong",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
      success: false,
      statusCode: 500,
    });
  }
};
export const getUserTranslationBylan = async (req: Request, res: Response) => {
  try {
    const { lang } = req.query as { lang: string };

    if (!["en", "ar"].includes(lang)) {
      return res.status(400).json({ error: "Invalid language parameter" });
    }
    const projections: { [key: string]: 0 | 1 } = {
      _id: 0,
      key: 1,
    };
    projections[lang] = 1;

    const translation = await Language.find({}, projections);
    if (translation) {
      const formattedTranslations = translation.reduce(
        (result: any, translation: any) => {
          result[translation.key] = translation[lang];
          return result;
        },
        {}
      );
      res.status(200).json({
        translation: [formattedTranslations],
        success: true,
        statusCode: 200,
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
      success: false,
      statusCode: 500,
    });
  }
};
