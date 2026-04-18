import React from 'react';
import { Document, Page, Text, View, StyleSheet, renderToBuffer, Font } from '@react-pdf/renderer';
import type { GeneratedResume } from '@/lib/ai/generate';

interface PersonalInfo {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  linkedin?: string;
}

type TemplateName = 'classic' | 'modern' | 'minimal' | 'professional' | 'executive';

interface TemplateColors {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  lightText: string;
}

const templateColors: Record<TemplateName, TemplateColors> = {
  classic: {
    primary: '#1a1a2e',
    secondary: '#16213e',
    accent: '#0f3460',
    text: '#1a1a1a',
    lightText: '#555555',
  },
  modern: {
    primary: '#2d3436',
    secondary: '#636e72',
    accent: '#0984e3',
    text: '#2d3436',
    lightText: '#636e72',
  },
  minimal: {
    primary: '#000000',
    secondary: '#333333',
    accent: '#666666',
    text: '#000000',
    lightText: '#666666',
  },
  professional: {
    primary: '#1b4332',
    secondary: '#2d6a4f',
    accent: '#40916c',
    text: '#1a1a1a',
    lightText: '#555555',
  },
  executive: {
    primary: '#3c1642',
    secondary: '#610f7f',
    accent: '#7b2cbf',
    text: '#1a1a1a',
    lightText: '#555555',
  },
};

function getColors(template: string): TemplateColors {
  return templateColors[template as TemplateName] || templateColors.classic;
}

function createStyles(colors: TemplateColors) {
  return StyleSheet.create({
    page: {
      padding: 40,
      fontSize: 10,
      fontFamily: 'Helvetica',
      color: colors.text,
      lineHeight: 1.4,
    },
    header: {
      marginBottom: 16,
      borderBottomWidth: 2,
      borderBottomColor: colors.primary,
      paddingBottom: 12,
    },
    name: {
      fontSize: 22,
      fontFamily: 'Helvetica-Bold',
      color: colors.primary,
      marginBottom: 4,
    },
    contactRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      fontSize: 9,
      color: colors.lightText,
    },
    contactItem: {
      marginRight: 12,
    },
    sectionTitle: {
      fontSize: 13,
      fontFamily: 'Helvetica-Bold',
      color: colors.primary,
      marginTop: 14,
      marginBottom: 6,
      borderBottomWidth: 1,
      borderBottomColor: colors.accent,
      paddingBottom: 3,
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    summary: {
      fontSize: 10,
      color: colors.text,
      marginBottom: 4,
      lineHeight: 1.5,
    },
    experienceItem: {
      marginBottom: 10,
    },
    expHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 2,
    },
    expTitle: {
      fontSize: 11,
      fontFamily: 'Helvetica-Bold',
      color: colors.secondary,
    },
    expDates: {
      fontSize: 9,
      color: colors.lightText,
    },
    expCompany: {
      fontSize: 10,
      color: colors.accent,
      marginBottom: 3,
    },
    bullet: {
      flexDirection: 'row',
      marginBottom: 2,
      paddingLeft: 8,
    },
    bulletDot: {
      width: 12,
      fontSize: 10,
    },
    bulletText: {
      flex: 1,
      fontSize: 9.5,
    },
    skillsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 4,
    },
    skillCategory: {
      marginBottom: 4,
    },
    skillCategoryLabel: {
      fontSize: 10,
      fontFamily: 'Helvetica-Bold',
      color: colors.secondary,
      marginBottom: 2,
    },
    skillList: {
      fontSize: 9.5,
      color: colors.text,
    },
    educationItem: {
      marginBottom: 6,
    },
    eduHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    eduDegree: {
      fontSize: 10,
      fontFamily: 'Helvetica-Bold',
      color: colors.secondary,
    },
    eduDate: {
      fontSize: 9,
      color: colors.lightText,
    },
    eduSchool: {
      fontSize: 9.5,
      color: colors.text,
    },
    certItem: {
      fontSize: 9.5,
      marginBottom: 2,
    },
    watermark: {
      position: 'absolute',
      bottom: 20,
      left: 0,
      right: 0,
      textAlign: 'center',
      fontSize: 8,
      color: '#cccccc',
    },
  });
}

interface ResumeDocumentProps {
  resume: GeneratedResume;
  personalInfo: PersonalInfo;
  template: string;
  isFree?: boolean;
}

function ResumeDocument({ resume, personalInfo, template, isFree }: ResumeDocumentProps) {
  const colors = getColors(template);
  const styles = createStyles(colors);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.name}</Text>
          <View style={styles.contactRow}>
            <Text style={styles.contactItem}>{personalInfo.email}</Text>
            {personalInfo.phone && <Text style={styles.contactItem}>{personalInfo.phone}</Text>}
            {personalInfo.location && <Text style={styles.contactItem}>{personalInfo.location}</Text>}
            {personalInfo.linkedin && <Text style={styles.contactItem}>{personalInfo.linkedin}</Text>}
          </View>
        </View>

        {/* Professional Summary */}
        <Text style={styles.sectionTitle}>Professional Summary</Text>
        <Text style={styles.summary}>{resume.professionalSummary}</Text>

        {/* Experience */}
        <Text style={styles.sectionTitle}>Experience</Text>
        {resume.experience.map((exp, i) => (
          <View key={i} style={styles.experienceItem}>
            <View style={styles.expHeader}>
              <Text style={styles.expTitle}>{exp.title}</Text>
              <Text style={styles.expDates}>{exp.dates}</Text>
            </View>
            <Text style={styles.expCompany}>{exp.company}</Text>
            {exp.bullets.map((bullet, j) => (
              <View key={j} style={styles.bullet}>
                <Text style={styles.bulletDot}>&#8226;</Text>
                <Text style={styles.bulletText}>{bullet}</Text>
              </View>
            ))}
          </View>
        ))}

        {/* Skills */}
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.skillCategory}>
          <Text style={styles.skillCategoryLabel}>Technical</Text>
          <Text style={styles.skillList}>{resume.skills.technical.join('  |  ')}</Text>
        </View>
        <View style={styles.skillCategory}>
          <Text style={styles.skillCategoryLabel}>Soft Skills</Text>
          <Text style={styles.skillList}>{resume.skills.soft.join('  |  ')}</Text>
        </View>

        {/* Education */}
        {resume.education.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Education</Text>
            {resume.education.map((edu, i) => (
              <View key={i} style={styles.educationItem}>
                <View style={styles.eduHeader}>
                  <Text style={styles.eduDegree}>
                    {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                  </Text>
                  {edu.date && <Text style={styles.eduDate}>{edu.date}</Text>}
                </View>
                <Text style={styles.eduSchool}>{edu.institution}</Text>
              </View>
            ))}
          </>
        )}

        {/* Certifications */}
        {resume.certifications && resume.certifications.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {resume.certifications.map((cert, i) => (
              <Text key={i} style={styles.certItem}>&#8226; {cert}</Text>
            ))}
          </>
        )}

        {/* Watermark for free users */}
        {isFree && (
          <Text style={styles.watermark}>Generated by ResumeAI - Free Version</Text>
        )}
      </Page>
    </Document>
  );
}

export async function generatePDF(
  resume: GeneratedResume,
  personalInfo: PersonalInfo,
  template: string = 'classic',
  isFree: boolean = true
): Promise<Buffer> {
  const buffer = await renderToBuffer(
    <ResumeDocument
      resume={resume}
      personalInfo={personalInfo}
      template={template}
      isFree={isFree}
    />
  );
  return Buffer.from(buffer);
}
