import io
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_RIGHT, TA_LEFT

class PDFReceiptService:
    @staticmethod
    def generate_receipt_pdf(registration_data: dict) -> bytes:
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(
            buffer,
            pagesize=letter,
            rightMargin=36,
            leftMargin=36,
            topMargin=36,
            bottomMargin=36
        )

        styles = getSampleStyleSheet()

        # Custom styles
        title_style = ParagraphStyle(
            'CollegeTitle',
            parent=styles['Heading1'],
            fontName='Helvetica-Bold',
            fontSize=16,
            leading=20,
            alignment=TA_CENTER,
            textColor=colors.HexColor('#0F172A')
        )
        subtitle_style = ParagraphStyle(
            'DeptSubTitle',
            parent=styles['Normal'],
            fontName='Helvetica-Bold',
            fontSize=11,
            leading=14,
            alignment=TA_CENTER,
            textColor=colors.HexColor('#0284C7')
        )
        event_header_style = ParagraphStyle(
            'EventSympTitle',
            parent=styles['Normal'],
            fontName='Helvetica-Bold',
            fontSize=13,
            leading=16,
            alignment=TA_CENTER,
            textColor=colors.HexColor('#475569')
        )
        section_heading = ParagraphStyle(
            'SecHead',
            parent=styles['Heading2'],
            fontName='Helvetica-Bold',
            fontSize=12,
            leading=15,
            textColor=colors.HexColor('#0F172A')
        )
        body_label = ParagraphStyle(
            'BodyLabel',
            parent=styles['Normal'],
            fontName='Helvetica-Bold',
            fontSize=9,
            leading=12,
            textColor=colors.HexColor('#334155')
        )
        body_val = ParagraphStyle(
            'BodyVal',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=9,
            leading=12,
            textColor=colors.HexColor('#0F172A')
        )
        table_header = ParagraphStyle(
            'TblHead',
            parent=styles['Normal'],
            fontName='Helvetica-Bold',
            fontSize=9,
            textColor=colors.white
        )
        table_cell = ParagraphStyle(
            'TblCell',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=9,
            textColor=colors.HexColor('#0F172A')
        )

        story = []

        # 1. Header Banner
        story.append(Paragraph("P.S.V COLLEGE OF ENGINEERING & TECHNOLOGY", title_style))
        story.append(Paragraph("DEPARTMENT OF ARTIFICIAL INTELLIGENCE & DATA SCIENCE", subtitle_style))
        story.append(Spacer(1, 4))
        story.append(Paragraph("AI NEXUS 2026 - NATIONAL LEVEL TECHNICAL SYMPOSIUM", event_header_style))
        story.append(Spacer(1, 10))
        story.append(HRFlowable(width="100%", thickness=2, color=colors.HexColor('#0284C7'), spaceAfter=15))

        # 2. Receipt Badge & ID Table
        reg_id = registration_data.get("registrationId", "PSVAIDS2026-0000")
        reg_date = registration_data.get("registrationDate", "2026-08-07")
        payment_status = registration_data.get("paymentStatus", "SUCCESS")
        
        info_data = [
          [
            Paragraph("<b>REGISTRATION RECEIPT</b>", section_heading),
            Paragraph(f"<b>Receipt ID:</b> {reg_id}<br/><b>Date:</b> {reg_date[:10]}", ParagraphStyle('RgtAlign', parent=styles['Normal'], alignment=TA_RIGHT, fontSize=9))
          ]
        ]
        info_table = Table(info_data, colWidths=[270, 270])
        info_table.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ]))
        story.append(info_table)
        story.append(Spacer(1, 10))

        # 3. Participant Details Table
        part = registration_data.get("participant", {})
        part_details = [
            [Paragraph("Participant Name:", body_label), Paragraph(part.get("fullName", "N/A"), body_val),
             Paragraph("Email Address:", body_label), Paragraph(part.get("email", "N/A"), body_val)],
            [Paragraph("Mobile Number:", body_label), Paragraph(part.get("mobileNumber", "N/A"), body_val),
             Paragraph("College Name:", body_label), Paragraph(part.get("collegeName", "N/A"), body_val)],
            [Paragraph("Department:", body_label), Paragraph(part.get("department", "N/A"), body_val),
             Paragraph("Academic Year:", body_label), Paragraph(part.get("year", "N/A"), body_val)]
        ]
        part_table = Table(part_details, colWidths=[100, 170, 100, 170])
        part_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#F8FAFC')),
            ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#E2E8F0')),
            ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
            ('TOPPADDING', (0,0), (-1,-1), 6),
            ('BOTTOMPADDING', (0,0), (-1,-1), 6),
            ('LEFTPADDING', (0,0), (-1,-1), 8),
            ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ]))
        story.append(part_table)
        story.append(Spacer(1, 15))

        # 4. Registered Events Table
        events = registration_data.get("selectedEvents", [])
        event_rows = [
            [Paragraph("S.No", table_header), Paragraph("Event Name", table_header), Paragraph("Category", table_header), Paragraph("Amount (INR)", table_header)]
        ]
        
        total_amt = 0.0
        for idx, ev in enumerate(events, 1):
            fee = float(ev.get("fee", 150.0))
            total_amt += fee
            event_rows.append([
                Paragraph(str(idx), table_cell),
                Paragraph(ev.get("eventName", "Event"), table_cell),
                Paragraph(ev.get("category", "Technical"), table_cell),
                Paragraph(f"₹{fee:.2f}", table_cell)
            ])
        
        event_rows.append([
            Paragraph("", table_cell),
            Paragraph("<b>TOTAL PAID</b>", table_cell),
            Paragraph("", table_cell),
            Paragraph(f"<b>₹{total_amt:.2f}</b>", table_cell)
        ])

        events_table = Table(event_rows, colWidths=[40, 240, 140, 120])
        events_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0F172A')),
            ('ALIGN', (0,0), (-1,-1), 'LEFT'),
            ('ALIGN', (3,0), (3,-1), 'RIGHT'),
            ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#CBD5E1')),
            ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#E2E8F0')),
            ('BACKGROUND', (0,-1), (-1,-1), colors.HexColor('#F1F5F9')),
            ('TOPPADDING', (0,0), (-1,-1), 6),
            ('BOTTOMPADDING', (0,0), (-1,-1), 6),
            ('LEFTPADDING', (0,0), (-1,-1), 8),
            ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ]))
        story.append(events_table)
        story.append(Spacer(1, 20))

        # 5. Payment & Verification Stamp
        status_color = colors.HexColor('#16A34A') if payment_status == 'SUCCESS' else colors.HexColor('#CA8A04')
        stamp_data = [
            [
                Paragraph(f"<b>Payment Status:</b> <font color='{status_color.hexval()}'>{payment_status}</font><br/><b>Payment ID:</b> {registration_data.get('payment', {}).get('paymentId', 'N/A')}", body_val),
                Paragraph("<b>OFFICIAL SEAL</b><br/><font color='#64748B'>P.S.V CET AI&DS Department</font>", ParagraphStyle('RgtAlign2', parent=styles['Normal'], alignment=TA_RIGHT, fontSize=9))
            ]
        ]
        stamp_table = Table(stamp_data, colWidths=[300, 240])
        stamp_table.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ]))
        story.append(stamp_table)

        story.append(Spacer(1, 30))
        story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#CBD5E1'), spaceAfter=10))

        # 6. Important Instructions & Footer
        footer_style = ParagraphStyle(
            'FooterNotes',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=8,
            leading=11,
            alignment=TA_CENTER,
            textColor=colors.HexColor('#64748B')
        )
        story.append(Paragraph("Please present this receipt along with your College ID Card at the registration counter on the day of the event.", footer_style))
        story.append(Paragraph("P.S.V College of Engineering & Technology, Balagananapalli, Krishnagiri - 635108 | Email: symposium.aids@psvcet.ac.in", footer_style))

        doc.build(story)
        pdf_bytes = buffer.getvalue()
        buffer.close()
        return pdf_bytes

pdf_service = PDFReceiptService()
