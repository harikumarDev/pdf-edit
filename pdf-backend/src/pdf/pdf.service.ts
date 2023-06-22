import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { PDFDocument, PDFTextField, PDFDropdown, PDFRadioGroup } from 'pdf-lib';

@Injectable()
export class PdfService {
  getForm(filePath: string) {
    const formData = fs.readFileSync(filePath);
    return formData;
  }

  async updateForm(filePath: string, data: Record<string, string>) {
    const formData = fs.readFileSync(filePath);
    const doc = await PDFDocument.load(formData);

    const form = doc.getForm();
    const fields = form.getFields();

    for (const [key, value] of Object.entries(data)) {
      let field = fields.find((f) => f.getName() === key);
      if (key.includes('firstName') || key.includes('lastName')) {
        const textField = field as PDFTextField;
        textField.setText(value);
      } else if (key.includes('roles')) {
        const dropDown = field as PDFDropdown;
        dropDown.select(value);
      } else {
        const radioGroup = field as PDFRadioGroup;
        radioGroup.select(value);
      }
    }

    const updatedPdf = await doc.save();
    return updatedPdf;
  }
}
