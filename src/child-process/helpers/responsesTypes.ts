import { Response } from 'express';

export type ResNode = {
  index: number;
  res: Response;
};

type ExtractData = {
  make: string;
  model: string;
  dateTime: string;
  exposureTime: string;
  isoSpeedRatings: string;
  lensModel: string;
  pixelXDimension: string;
  pixelYDimension: string;
  gpsAltitude: string;
  gpsLongitude: string;
};

export type ChildMsg = {
  index: number;
  extractData: ExtractData;
  done: boolean;
  errMsg: string;
  initMsg?: string;
};
