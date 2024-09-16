import { Request, Response } from 'express';

const findMax = (matrix: number[][]): number => {
  return Math.max(...matrix.flat());
};

const findMin = (matrix: number[][]): number => {
  return Math.min(...matrix.flat());
};

const findAverage = (matrix: number[][]): number => {
  const totalSum = findSum(matrix);
  const totalCount = matrix.flat().length;
  return totalSum / totalCount;
};

const findSum = (matrix: number[][]): number => {
  return matrix.flat().reduce((acc, val) => acc + val, 0);
};

const isDiagonal = (matrix: number[][]): boolean => {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (i !== j && matrix[i][j] !== 0) {
        return false;
      }
    }
  }
  return true;
};

export const processMatrix = (req: Request, res: Response): void => {
  const { Q, R }: { Q: number[][]; R: number[][] } = req.body;

  if (!Q || !R) {
    res.status(400).json({ error: 'Se requieren las matrices Q y R en el cuerpo de la solicitud.' });
    return;
  }

  const operations = {
    Q: {
      max: findMax(Q),
      min: findMin(Q),
      average: findAverage(Q),
      sum: findSum(Q),
      isDiagonal: isDiagonal(Q),
    },
    R: {
      max: findMax(R),
      min: findMin(R),
      average: findAverage(R),
      sum: findSum(R),
      isDiagonal: isDiagonal(R),
    }
  };

  res.json(operations);
};