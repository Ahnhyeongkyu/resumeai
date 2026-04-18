import {
  Document,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  Packer,
  TabStopPosition,
  TabStopType,
} from 'docx';
import type { GeneratedResume } from '@/lib/ai/generate';

interface PersonalInfo {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  linkedin?: string;
}

function createContactLine(personalInfo: PersonalInfo): string {
  const parts = [personalInfo.email];
  if (personalInfo.phone) parts.push(personalInfo.phone);
  if (personalInfo.location) parts.push(personalInfo.location);
  if (personalInfo.linkedin) parts.push(personalInfo.linkedin);
  return parts.join('  |  ');
}

function createSectionHeader(text: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text: text.toUpperCase(),
        bold: true,
        size: 24,
        font: 'Calibri',
        color: '1a1a2e',
      }),
    ],
    spacing: { before: 300, after: 100 },
    border: {
      bottom: {
        color: '1a1a2e',
        space: 4,
        style: BorderStyle.SINGLE,
        size: 6,
      },
    },
  });
}

function createBulletPoint(text: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        size: 20,
        font: 'Calibri',
      }),
    ],
    bullet: { level: 0 },
    spacing: { after: 40 },
  });
}

export async function generateDOCX(
  resume: GeneratedResume,
  personalInfo: PersonalInfo
): Promise<Buffer> {
  const children: Paragraph[] = [];

  // Header - Name
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: personalInfo.name,
          bold: true,
          size: 36,
          font: 'Calibri',
          color: '1a1a2e',
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 80 },
    })
  );

  // Contact info
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: createContactLine(personalInfo),
          size: 18,
          font: 'Calibri',
          color: '555555',
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    })
  );

  // Professional Summary
  children.push(createSectionHeader('Professional Summary'));
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: resume.professionalSummary,
          size: 20,
          font: 'Calibri',
        }),
      ],
      spacing: { after: 120 },
    })
  );

  // Experience
  children.push(createSectionHeader('Experience'));
  for (const exp of resume.experience) {
    // Title and dates on same line
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: exp.title,
            bold: true,
            size: 22,
            font: 'Calibri',
            color: '16213e',
          }),
          new TextRun({
            text: `\t${exp.dates}`,
            size: 18,
            font: 'Calibri',
            color: '555555',
          }),
        ],
        tabStops: [
          {
            type: TabStopType.RIGHT,
            position: TabStopPosition.MAX,
          },
        ],
        spacing: { before: 160, after: 40 },
      })
    );

    // Company
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: exp.company,
            size: 20,
            font: 'Calibri',
            color: '0f3460',
            italics: true,
          }),
        ],
        spacing: { after: 60 },
      })
    );

    // Bullets
    for (const bullet of exp.bullets) {
      children.push(createBulletPoint(bullet));
    }
  }

  // Skills
  children.push(createSectionHeader('Skills'));

  if (resume.skills.technical.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: 'Technical: ',
            bold: true,
            size: 20,
            font: 'Calibri',
          }),
          new TextRun({
            text: resume.skills.technical.join(', '),
            size: 20,
            font: 'Calibri',
          }),
        ],
        spacing: { after: 60 },
      })
    );
  }

  if (resume.skills.soft.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: 'Soft Skills: ',
            bold: true,
            size: 20,
            font: 'Calibri',
          }),
          new TextRun({
            text: resume.skills.soft.join(', '),
            size: 20,
            font: 'Calibri',
          }),
        ],
        spacing: { after: 60 },
      })
    );
  }

  // Education
  if (resume.education.length > 0) {
    children.push(createSectionHeader('Education'));
    for (const edu of resume.education) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${edu.degree}${edu.field ? ` in ${edu.field}` : ''}`,
              bold: true,
              size: 20,
              font: 'Calibri',
            }),
            new TextRun({
              text: edu.date ? `\t${edu.date}` : '',
              size: 18,
              font: 'Calibri',
              color: '555555',
            }),
          ],
          tabStops: [
            {
              type: TabStopType.RIGHT,
              position: TabStopPosition.MAX,
            },
          ],
          spacing: { before: 100, after: 40 },
        })
      );
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: edu.institution,
              size: 20,
              font: 'Calibri',
            }),
          ],
          spacing: { after: 60 },
        })
      );
    }
  }

  // Certifications
  if (resume.certifications && resume.certifications.length > 0) {
    children.push(createSectionHeader('Certifications'));
    for (const cert of resume.certifications) {
      children.push(createBulletPoint(cert));
    }
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720,
              right: 720,
              bottom: 720,
              left: 720,
            },
          },
        },
        children,
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  return Buffer.from(buffer);
}
