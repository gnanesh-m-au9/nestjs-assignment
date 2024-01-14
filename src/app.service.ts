// app.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private storedData: Map<number, { name: string; id: number }> = new Map();
  private currentRandomNumber: number;

  setValues(name: string, id: number): number {
    this.currentRandomNumber = Math.floor(Math.random() * 1000) + 1;
    this.storedData.set(this.currentRandomNumber, { name, id });
    return this.currentRandomNumber;
  }

  getValues(randomNumber: number): { name: string; id: number } | null {
    console.log(this.storedData)
    console.log(randomNumber)
    return this.storedData.get(randomNumber) || null;
  }

  getAllValues(): { [randomNumber: number]: { name: string; id: number } } {
    const allValues: { [randomNumber: number]: { name: string; id: number } } = {};
    this.storedData.forEach((value, key) => {
      allValues[key] = value;
    });
    return allValues;
  }
}
