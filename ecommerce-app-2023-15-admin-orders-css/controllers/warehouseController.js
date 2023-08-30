import warehouseModel from "../models/warehouseModel.js";

import fs from "fs";
import slugify from "slugify";
import dotenv from "dotenv"

dotenv.config();

export const createWareHouseController = async (req, res) => {
    try {
        const { name, province, city, district, street, number, totalAreaVolume} = 
        req.fields;

        switch(true) {
            case !name:
                return res.status(500).send({error: "name is require"})
            case !province:
                return res.status(500).send({error: "province is require"})
            case !city:
                return res.status(500).send({error: "city is require"})
            case !district:
                return res.status(500).send({error: "district is require"})
            case !street:
                return res.status(500).send({error: "street is require"})
            case !number:
                return res.status(500).send({error: "number is require"})
            case !totalAreaVolume:
                return res.status(500).send({error: "Area is require"})
        }
        const warehouse = new warehouseModel({ ...req.fields, slug: slugify(name) });
        await warehouse.save();
        res.status(201).send({
            success:true,
            message: "create warehouse successfully",
            warehouse,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating"
        })
    }
};

export const getWareHousesController = async (req, res) => {
    try {
      const warehouses = await warehouseModel
        .find({})
        .limit(12)
        .sort({ createdAt: -1 });
      res.status(200).send({
        success: true,
        counTotal: warehouse.length,
        message: "all warehouse ",
        warehouses,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr in getting warehouse",
        error: error.message,
      });
    }
  };

  export const getWareHouseController = async (req, res) => {
    try {
      const warehouse = await warehouseModel
        .findOne({ slug: req.params.slug })
      res.status(200).send({
        success: true,
        message: "Single Product Fetched",
        warehouse,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Eror while getitng single product",
        error,
      });
    }
  }; 

  export const updateWareHouseController = async (req, res) => {
    try {
        const {name, address, province, city, district, street, number, totalAreaVolume} = res.fields;

        switch(true) {
            case !name:
                return res.status(500).send({error: "name is require"})
            case !province:
                return res.status(500).send({error: "province is require"})
            case !city:
                return res.status(500).send({error: "city is require"})
            case !district:
                return res.status(500).send({error: "district is require"})
            case !street:
                return res.status(500).send({error: "street is require"})
            case !number:
                return res.status(500).send({error: "number is require"})
            case !totalAreaVolume:
                return res.status(500).send({error: "Area is require"})
        }

        const warehouses = await warehouseModel.findByIdAndUpdate(
            req.params.name,
            { ...req.fields, slug: slugify(name) },
            {new: true }
        )

        await warehouse.save();
        res.status(201).send({
            success:true,
            message: "update warehouse successfully",
            warehouses,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in updating"
        })
    }
};

export const deleteWarehouseController = async (req, res) => {
    try {
      await warehouseModel.findByIdAndDelete(req.params.name);
      res.status(200).send({
        success: true,
        message: "Product Deleted successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while deleting product",
        error,
      });
    }
  };

export const warehousesFiltersController = async (req, res) => {
    try {
      const { checked, radio } = req.body;
      let args = {};
      if (checked.length > 0) args.name = checked;
      if (radio.length) args.totalAreaVolume = { $gte: radio[0], $lte: radio[1] };
      const warehouses = await warehouseModel.find(args);
      res.status(200).send({
        success: true,
        warehouses,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Filtering warehouse",
        error,
      });
    }
  };

  export const searchWarehouseController = async (req, res) => {
    try {
      const { keyword } = req.params;
      const resutls = await warehouseModel
        .find({
          $or: [
            { name: { $regex: keyword, $options: "i" } },
            { city: { $regex: keyword, $options: "i" } },
          ],
        });
      res.json(resutls);
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error In Search Product API",
        error,
      });
    }
  };