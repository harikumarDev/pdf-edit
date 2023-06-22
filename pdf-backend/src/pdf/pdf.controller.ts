import * as path from 'path';
import { Controller, Get, Header, Patch, Res, Body } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { Response } from 'express';
import { UpdatePdfDto } from './updatePdf.dto';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Get()
  @Header('Content-Type', 'application/pdf')
  async loadPdfForm(@Res() res: Response) {
    const pdfPath = path.resolve(__dirname, '../assets/form.pdf');
    const formData = this.pdfService.getForm(pdfPath);

    res.send(formData);
  }

  @Patch()
  async updatePdf(@Body() form: UpdatePdfDto) {
    const pdfPath = path.resolve(__dirname, '../assets/form.pdf');
    const updatedPdf = await this.pdfService.updateForm(pdfPath, form.data);
    return {
      success: true,
      updatedPdf,
    };
  }
}
