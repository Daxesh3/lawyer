import { IFeeLetterData } from '../types/feeLetterTypes';

export const generateFeeLetterText = (data: IFeeLetterData) => {
  let output: string = '';

  // Get sender name based on letter type
  const getSenderName = () => {
    switch (data.letterType) {
      case 'facilityAgent':
        return data.facilityAgentName;
      case 'securityAgent':
        return data.securityAgentName;
      case 'globalCoordinator':
        return data.globalCoordinatorName;
      case 'coordinatingBank':
        return data.coordinatingBankName;
      case 'upfront':
      case 'mandatedLeadArranger':
      case 'arranger':
        return data.facilityAgentName;
      default:
        return data.facilityAgentName;
    }
  };

  // Get letter title based on letter type
  const getLetterTitle = () => {
    switch (data.letterType) {
      case 'facilityAgent':
        return 'FACILITY AGENT FEE LETTER';
      case 'securityAgent':
        return 'SECURITY AGENT FEE LETTER';
      case 'globalCoordinator':
        return 'GLOBAL CO-ORDINATOR FEE LETTER';
      case 'coordinatingBank':
        return 'CO-ORDINATING BANK FEE LETTER';
      case 'upfront':
        return 'UPFRONT FEE LETTER';
      case 'mandatedLeadArranger':
        return 'MANDATED LEAD ARRANGER FEE LETTER';
      case 'arranger':
        return 'ARRANGER FEE LETTER';
      default:
        return 'FACILITY AGENT FEE LETTER';
    }
  };

  // Header
  output += `<p class='title mb-6'><b>${getLetterTitle()}</b></p>`;

  // Addressee
  output += `<p class='mb-6'>To: ${data.borrowerName}</p>`;

  // Sender
  output += `<p class='mb-6'>From: ${getSenderName()}</p>`;

  // Date
  output += `<p class='mb-6'>Date: ${data.currentYear}</p></br>`;

  // Salutation
  output += `<p>Dear Sir/Madam</p></br>`;

  // Header
  output += `<p class='mb-6'><b>${data.currency} ${data.amount} ${data.facilityType} (the "Facility Agreement") dated on or about the date hereof and made between, amongst others, ${data.borrowerName} as borrower (the "Borrower") and ${data.facilityAgentName} as facility agent (the "Facility Agent")</b></p></br>`;

  // Introduction
  output += `<div class="numbered-item"><p>1.</p><p class='para-content'>We refer to the Facility Agreement.</p></div>\n`;
  output += `<div class="numbered-item"><p>2.</p><p class='para-content'>Unless otherwise defined in this Fee Letter, terms defined in the Facility Agreement shall have the same meaning in this Fee Letter. The rules of interpretation and construction contained in clause *{ [1.2] (Construction)}* of the Facility Agreement shall apply to this Fee Letter as if set out in full in this Fee Letter mutatis mutandis, and references in those clauses to "this Agreement" or the *{Finance Documents}* shall be construed as references to this Fee Letter.</p></div>\n`;

  // Specific introduction based on letter type
  switch (data.letterType) {
    case 'facilityAgent':
      output += `<div class="numbered-item"><p>3. </p><p class='para-content'>This Letter is the Facility Agent Fee Letter.</p></div>\n`;
      break;
    case 'securityAgent':
      output += `<div class="numbered-item"><p>3. </p><p class='para-content'>This Letter is the Security Agent Fee Letter.</p></div>\n`;
      break;
    case 'globalCoordinator':
      output += `<div class="numbered-item"><p>3. </p><p class='para-content'>This Letter is the Global Co-Ordinator Fee Letter.</p></div>\n`;
      break;
    case 'coordinatingBank':
      output += `<div class="numbered-item"><p>3. </p><p class='para-content'>This Letter is the Co-Ordinating Bank Fee Letter.</p></div>\n`;
      break;
    case 'upfront':
      output += `<div class="numbered-item"><p>3. </p><p class='para-content'>This Letter is the Upfront Fee Letter.</p></div>\n`;
      break;
    case 'mandatedLeadArranger':
      output += `<div class="numbered-item"><p>3. </p><p class='para-content'>This Letter is the Mandated Lead Arranger Fee Letter.</p></div>\n`;
      break;
    case 'arranger':
      output += `<div class="numbered-item"><p>3. </p><p class='para-content'>This Letter is the Arranger Fee Letter.</p></div>\n`;
      break;
    default:
      output += `<div class="numbered-item"><p>3. </p><p class='para-content'>This Letter is the Facility Agent Fee Letter.</p></div>\n`;
  }

  // Add the letter type as a Finance Document
  output += `<div class="numbered-item"><p>4. </p><p class='para-content'>This ${getLetterTitle()
    .replace(/\(|\)/g, '')
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')} is a *{Finance Documents}* for the purposes of the Facility Agreement.</p></div>\n`;

  // Fees section based on letter type
  switch (data.letterType) {
    case 'facilityAgent':
      if (data.hasFacilityAgentOptions) {
        output += `<div class="numbered-item"><p>5. </p><p class='para-content'>You shall pay to the Facility Agent (for its own account):</div>\n`;

        if (data.setupFeeAmount) {
          output += `<div class="numbered-item"><p class='indent'>(a) </p><p>a one-off set-up fee in an amount of ${data.currency} ${data.setupFeeAmount} (the <b>"Set-Up Fee"</b>),</p></div>\n`;
        }

        output += `<div class="numbered-item"><p class='indent'>(b) </p><p>a fee of ${data.currency} ${data.facilityAgentFeeAmount} per annum, which is payable in advance, for the Facility Agent acting as facility agent pursuant to the provisions of the Facility Agreement (the <b>"Facility Agent Fee"</b>),</p></div>\n`;

        if (data.increaseFeeAmount) {
          output += `<div class="numbered-item"><p class='indent'>(c) </p><p>a fee of ${data.currency} ${data.increaseFeeAmount} if the Borrower exercises the Increase Option more than ${data.increaseCount} times (the "Increase Fee"), and</p></div>\n`;
        }

        if (data.debtdomainFeeAmount) {
          output += `<div class="numbered-item"><p class='indent'>(d) </p><p><p>fee of ${data.currency} ${data.debtdomainFeeAmount} per annum, which is payable in advance, for the use of a publishing system known as Debtdomain to assist in certain administrative tasks specific to the Facility Agent under the terms of the Facility Agreement(the  <b>"Debtdomain Fee"</b>). The Facility Agent reserves the right to increase the Debtdomain Fee at its discretion if Debtdomain charges increase provided always that such increase of the Debtdomain Fee shall be more than the increase of Debtdomain charges.</p></div>\n`;
        }

        output += `<div class="numbered-item"><p class='indent'>(e) </p><p>The Set-Up Fee, Facility Agent Fee, Increase Fee and Debtdomain Fee shall hereinafter be referred to as the <b>"Agency Fees"</b>.</p></div>\n`;
      } else {
        output += `<p class='indent'>Only one type: facility agent pursuant to the provisions of the Facility Agreement (the <b>"Facility Agent Fee"</b>).</p>\n`;
      }
      break;

    case 'securityAgent':
      output += `<div class="numbered-item"><p>5. </p><p class='para-content'>You shall pay to the Security Agent (for its own account) a fee of ${data.currency} ${data.securityAgentFeeAmount} per annum, which is payable in advance, for the Security Agent acting as security agent pursuant to the provisions of the Facility Agreement (the <b>"Security Agent Fee"</b>).</p></div>\n`;
      break;

    case 'globalCoordinator':
      output += `<div class="numbered-item"><p>5. </p><p class='para-content'>You shall pay to the Global Co-Ordinator (for its own account) a flat fee of ${data.currency} ${data.globalCoordinatorFeeAmount} for the Global Co-Ordinator acting as global co-ordinator pursuant to the provisions of the Facility Agreement (the <b>"Global Co-Ordinator Bank Fee"</b>).</p></div>\n`;
      break;

    case 'coordinatingBank':
      output += `<div class="numbered-item"><p>5. </p><p class='para-content'>You shall pay to the Co-Ordinating Bank (for its own account) a flat fee of ${data.currency} ${data.coordinatingBankFeeAmount} for the CoOrdinating Bank acting as co-ordinating bank pursuant to the provisions of the Facility Agreement (the <b>"Coordinating Bank Fee"</b>).</p></div>\n`;
      break;

    case 'upfront':
      output += `<div class="numbered-item"><p>5. </p><p class='para-content'>You shall pay to the Facility Agent (for the account of the *{Original Lenders}*) a fee of ${data.currency} ${data.upfrontFeeAmount} for the *{Original Lenders}* extending their Commitments to the Borrower under the Facility Agreement (an "Upfront Fee"). Each *{Original Lender}* shall be entitled to its pro rata share of the Upfront Fee. Its pro rata share shall be equal to the proportion its Commitment bears to the Total Commitment.</p></div>\n`;
      break;

    case 'mandatedLeadArranger':
      output += `<div class="numbered-item"><p>5. </p><p class='para-content'>You shall pay to the Facility Agent (for the account of the *{Mandated Lead Arrangers}*) a fee of ${data.currency} ${data.mandatedLeadArrangerFeeAmount} for the *{Mandated Lead Arrangers}* under the Facility Agreement (an "Mandated Lead Arranger Fee"). Each *{Mandated Lead Arranger}* shall be entitled to its pro rata share of the Mandated Lead Arranger Fee. Its pro rata share shall be equal to the proportion its Commitment bears to the Total Commitment of all the *{Mandated Lead Arrangers}*</p></div>\n`;
      break;

    case 'arranger':
      output += `<div class="numbered-item"><p>5. </p><p class='para-content'>You shall pay to the Facility Agent (for the account of the *{Arrangers}*) a fee of ${data.currency} ${data.arrangerFeeAmount} for the *{Arrangers}* under the Facility Agreement (an <b>"Arranger Fee"</b>). Each *{Arranger}* shall be entitled to its pro rata share of the Arranger Fee. Its pro rata share shall be equal to the proportion its Commitment bears to the Total Commitment of all the *{Arrangers}*</p></div>\n`;
      break;

    default:
      // Default to facility agent
      output += `Only one type: facility agent pursuant to the provisions of the Facility Agreement (the <b>"Facility Agent Fee"</b>).\n`;
  }

  output += `<div class="numbered-item"><p>6. </p><p class='para-content'>The Agency Fees shall become due and payable as set out below</p></div>\n`;

  // Payment Modalities based on letter type
  switch (data.letterType) {
    case 'facilityAgent':
      if (data.hasFacilityAgentOptions) {
        output += `<div class="numbered-item"><p class='indent'>(a) </p><p>The Set-Up Fee is payable on or before the earlier to occur of the date falling {[${data.businessDays}]} *{Business Days}* after the date of the Facility Agreement and the first *{Utilisation Date}* under the Facility Agreement (the <b>"First Payment Date"</b>).</p></div>\n`;

        if (data.paymentModality === 'annual') {
          output += `<div class='flex-col'><div class="numbered-item"><p class='indent'>(b) </p><p>The first payment of the Facility Agent Fee is payable on or before [the earlier to occur of the date falling {[${data.businessDays}]} *{Business Days}* after the date of the Facility Agreement and the first *{Utilisation Date}* under the Facility Agreement (the "FirstPayment Date")][the First Payment Date]. Each subsequent payment of the Facility Agent Fee shall be made annually in advance, commencing on the first anniversary of the First Payment Date and thereafter on each subsequent anniversary of the First Payment Date, until (but excluding) the earlier of</p></div>
        
       <div class="numbered-item"><p class='account-details'>(i)</p><p>the *{Final Maturity Date}*,</p></div>
        <div class="numbered-item"><p class='account-details'>(ii)</p><p>the date we resign or are replaced as facility agent and</p></div>
        <div class="numbered-item"><p class='account-details'>(iii)</p><p>the date of prepayment of all *{Loans}* and cancellation - of all *{Commitments}*, in each case under the Facility Agreement (the <b>"Final Payment Date"</b>).</p></div></div>\n`;
        } else if (data.paymentModality === 'semiannual') {
          output += `<div class='flex-col'><div class="numbered-item"><p class='indent'>(b) </p><p>The Facility Agent Fee shall be payable to us in equal semi-annual instalments. Each installment shall amount to half of the annual Facility Agent Fee. The first installment of the Facility Agent Fee is payable on or before the First Payment Date. Thereafter any subsequent installment of the FacilityAgent Fee shall be made to us on the dates falling at intervals of six (6) months until (but excluding) the earlier of </p></div>
          
        <div class="numbered-item"><p class='account-details'>(i)</p><p>the *{Final Maturity Date}*,</p></div> 
        <div class="numbered-item"><p class='account-details'>(ii)</p><p>the date we resign or are replaced as agent and</p></div> 
        <div class="numbered-item"><p class='account-details'>(iii)</p><p>the date of prepayment of all Loans and cancellation of all Commitments, in each case under the Facility Agreement (the <b>"Final Payment Date"</b>).</p></div></div>\n`;
        } else if (data.paymentModality === 'quarterly') {
          output += `<div class='flex-col'><div class="numbered-item"><p class='indent'>(b) </p><p>The Facility Agent Fee shall be payable to us in equal quarterly instalments. Each instrument shall amount to a quarter of the annual Facility Agent Fee. The first installment of the Facility Agent Fee is payable on or before [the earlier to occur of the date falling {[${data.businessDays}]} *{Business Days}* after the date of the Facility Agreement and the first *{Utilisation Date}* under the Facility Agreement (the "First Payment Date")] [the First Payment Date]. Thereafter any subsequent installment of the Facility Agent Fee shall be made to us on the dates falling at intervals of three (3) months until (but excluding) the earlier of </p></div>
        
        <div class="numbered-item"><p class='account-details'>(i)</p><p>the *{Final Maturity Date}*,</p></div> 
        <div class="numbered-item"><p class='account-details'>(ii)</p><p>the date we resign or are replaced as agent and</p></div>
        <div class="numbered-item"><p class='account-details'>(iii)</p><p>the date of prepayment of all Loans and cancellation of all Commitments, in each case under the Facility Agreement (the <b>"Final Payment Date"</b>).</p></div></div>\n`;
        }

        output += `<div class="numbered-item"><p class='indent'>(c) </p><p>The Increase Fee shall be payable to the Facility Agent on or prior to the date falling {[${data.businessDays}]} *{Business Days}* after the Increase Date and on or prior to the date falling {[${data.businessDays}]} *{Business Days}* after each subsequent Increase Date.</p></div>\n`;
        output += `<div class="numbered-item"><p class='indent'>(d) </p><p>The first payment of the Debtdomain Fee is payable on or before the First Payment Date. Each subsequent payment of the Debtdomain Fee shall be made annually in advance, commencing on the first anniversary of the First Payment Date and thereafter on each subsequent anniversary of the First Payment Date, until the Final Payment Date.</p></div>\n`;
      }
      break;

    case 'securityAgent':
      output += `Payment Modalities Security Agent\n[Optional]\n`;

      if (data.paymentModality === 'annual') {
        output += `<div class='flex-col'><div class="numbered-item"><p>6.</p><p>The first payment of the Security Agent Fee is payable on or before the earlier to occur of the date falling {[${data.businessDays}]} *{Business Days}* after the date of the Facility Agreement and the first *{Utilisation Date}* under the Facility Agreement (the "First Payment Date"). Each subsequent payment of the Security Agent Fee shall be made annually in advance, commencing on the fist anniversary of the First Payment Date and thereafter on each subsequent anniversary of the First Payment Date, until (but excluding) the earlier of</p></div>
        
        <div class="numbered-item"><p class='account-details'>(i)</p><p>the *{Final Maturity Date}*,</p></div>
        <div class="numbered-item"><p class='account-details'>(ii)</p><p>the date we resign or are replaced as facility agent and</p></div>
        <div class="numbered-item"><p class='account-details'>(iii)</p><p>the date of prepayment of all *{Loans}* and cancellation of all *{Commitments}*, in each case under the Facility Agreement.</p></div></div>`;
      } else if (data.paymentModality === 'semiannual') {
        output += `<div class='flex-col'><div class="numbered-item"><p>6.</p><p>The Security Agent Fee shall be payable to us in equal semi-annual instalments. Each installment shall amount to half of the annual Security Agent Fee. The first installment of the Security Agent Fee is payable on or before the earlier to occur of the date falling {[${data.businessDays}]} *{Business Days}* after the date of the Facility Agreement and the first *{Utilisation Date}* under the Facility Agreement (the "First Payment Date"). Thereafter any subsequent installment of the Security Agent Fee shall be made to us on the dates falling at intervals of six (6) months until (but excluding) the earlier of</p></div>
       
        <div class="numbered-item"><p class='account-details'>(i)</p><p>the *{Final Maturity Date}*,</p></div>
        <div class="numbered-item"><p class='account-details'>(ii)</p><p>the date we resign or are replaced as agent and</p></div>
        <div class="numbered-item"><p class='account-details'>(iii)</p><p>the date of prepayment of all Loans and cancellation of all Commitments, in each case under the Facility Agreement.</p></div></div>`;
      } else if (data.paymentModality === 'quarterly') {
        output += `<div class='flex-col'><div class="numbered-item"><p>6.</p><p>The Security Agent Fee shall be payable to us in equal quarterly instalments. Each installment shall amount to a quarter of the annual Security Agent Fee. The first installment of the Security Agent Fee is payable on or before the earlier to occur of the date falling {[${data.businessDays}]} *{Business Days}* after the date of the Facility Agreement and the first *{Uti1isation Date}* under the Facility Agreement (the "First Payment Date"). Thereafter any subsequent installment of the Security Agent Fee shall be made to us on the dates falling at intervals of three (3) months until (but excluding) the earlier of </p></div>
       
        <div class="numbered-item"><p class='account-details'>(i)</p><p>the *{Final Maturity Date}*,</p></div>
        <div class="numbered-item"><p class='account-details'>(ii)</p><p>the date we resign or are replaced as agent and</p></div>
        <div class="numbered-item"><p class='account-details'>(iii)</p><p>the date of prepayment of all Loans and cancellation of all Commitments, in each case under the Facility Agreement.</p></div></div>`;
      }
      break;

    case 'globalCoordinator':
      output += `Payment Modalities Global Co-Ordinating Bank\n:<div class="numbered-item"><p>6.</p>The Global Co-ordinator Fee is payable on or before the earlier to occur of the date falling {[${data.businessDays}]} *{Business Days}* after the date of the Facility Agreement and the first *{Utilisation Date}* under the Facility Agreement.</div>`;
      break;

    case 'coordinatingBank':
      output += `Payment Modalities Co-Ordinating Bank\n:<div class="numbered-item"><p>6.</p>The Co-ordinating Bank Fee is payable on or before the earlier to occur of the date falling {[${data.businessDays}]} *{Business Days}* after the date of the Facility Agreement and the first *{Utilisation Date}* under the Facility Agreement.</div>`;
      break;

    case 'upfront':
      output += `Payment Modalities Upfront\n:<div class="numbered-item"><p>6.</p>The Upfront Fee is payable on or before the earlier to occur of the date falling {[${data.businessDays}]} *{Business Days}* after the date of the Facility Agreement and the first *{Utilisation Date}* under the Facility Agreement.</div>`;
      break;

    case 'mandatedLeadArranger':
      output += `Payment Modalities Mandate Lead Arranger\n:<div class="numbered-item"><p>6.</p>The Mandated Lead Arranger Fee is payable on or before the earlier to occur of the date falling {[${data.businessDays}]} *{Business Days}* after the date of the Facility Agreement and the first *{Utilisation Date}* under the Facility Agreement.</div>`;
      break;

    case 'arranger':
      output += `Payment Modalities Arranger\n:<div class="numbered-item"><p>6.</p>The Arranger Fee is payable on or before the earlier to occur of the date falling {[${data.businessDays}]} *{Business Days}* after the date of the Facility Agreement and the first *{Utilisation Date}* under the Facility Agreement.</div>`;
      break;

    default:
      break;
  }

  // Bank account details
  if (data.bankDetails.accountBank || data.bankDetails.accountNumber) {
    output += `<div class='flex flex-col'><div class="numbered-item"><p>7.</p><p class='para-content'>All payments made by you under this Fee Letter must be made in immediately available, freely transferable and cleared funds by crediting the following bank account</p></div>
    <div class='flex flex-col mt-2'>
    <p class='ml-20'>Account Bank: ${data.bankDetails.accountBank}</p>
    <p class='ml-20'>Account Holder: ${data.bankDetails.accountHolder}</p>
    <p class='ml-20'>Account No.: ${data.bankDetails.accountNumber}</p>
    <p class='ml-20'>Sort Code: ${data.bankDetails.sortCode}</p>
    <p class='ml-20'>IBAN: ${data.bankDetails.iban}</p>
    <p class='ml-20'>Ref: ${data.borrowerName}-${data.currency} ${data.amount} ${data.facilityType} Facility Agreement\nor such other account as we manotify you in writing with {[${data.businessDays}]} *{Business Days}* prior notice.</p></div></div>\n`;
  } else {
    output += `<div class="numbered-item"><p>7.</p><p class='para-content'>A11 payments made by you under this Fee Letter must be made in immediately available, freely transferable and cleared funds by crediting our account (the details of which we have provided you with separately) or such other account as we may notify you in writing with {[${data.businessDays}]} *{Business Days'}*' prior notice.</p></div>\n`;
  }

  // Tax and VAT

  //For Gross Up Provision
  if (data.grossUpProvision === 'Standalone') {
    output += `<div class="numbered-item"><p>8.</p><p class='para-content'>If any *{Tax}* or amount in respect of a *{Tax}* must be deducted or withheld from any amount payable or paid by the ${data.borrowerName} on account of or by reference to any payment by or obligation of the ${data.borrowerName} hereunder, the ${data.borrowerName} shall pay such additional amounts as may be necessary to ensure that the recipient of such payment receives a net amount equal to the full amount which we would have received from the ${data.borrowerName} had such *{Tax}* not been made.</p></div>\n`;
  } else {
    output += `<div class="numbered-item"><p>8.</p><p class='para-content'>Clause *{ {12} (Tax Gross Up and Indemnities)}* of the Facility Agreement shall apply to this letter as if set out in full in this letter, mutatis mutandis, and references in that clause to Finance Documents shall be construed as including this Fee Letter.</p></div>\n`;
  }

  //For VAT Provision
  if (data.vatProvision === 'Standalone') {
    output += `<div class="numbered-item"><p>9. </p><p class='para-content'>All payments in connection with this Fee Letter are exclusive of any value added tax or similar charge ("<b>VAT</b>"). If VAT is chargeable, the ${data.borrowerName} shall also and at the same time pay to the recipient of the relevant payment an amount equal to the amount of the VAT.</p></div>\n`;
  } else {
    output += `<div class="numbered-item"><p>9. </p><p class='para-content'>Clause *{ {¢} (VAT)}* of the Facility Agreement shall apply to this letter as if set out in full in this letter, mutatis mutandis, and references in that clause to Finance Documents shall be construed as including this Fee Letter.</p></div>\n`;
  }

  // Fee refunds - only for facility agent and security agent
  if (data.letterType === 'facilityAgent' || data.letterType === 'securityAgent') {
    output += `<div class="numbered-item"><p>10.</p><p class='para-content'>The ${
      data.letterType === 'facilityAgent' ? 'Agency' : 'Security Agent'
    } Fees once paid are non-refundable (in whole or in part) and non-creditable (in whole or in part) against other fees in connection with the Facility Agreement</p></div>\n`;
  }

  // Miscellaneous
  output += `<div class="numbered-item"><p>11.</p><p class='para-content'>This Fee Letter and your rights hereunder may not be assigned by you without our prior written consent.</p></div>\n`;

  // Identify the agent name based on letter type
  let agentName = '';
  switch (data.letterType) {
    case 'facilityAgent':
      agentName = 'Facility Agent';
      break;
    case 'securityAgent':
      agentName = 'Security Agent';
      break;
    case 'globalCoordinator':
      agentName = 'Global Co-Ordinator';
      break;
    case 'coordinatingBank':
      agentName = 'Co-Ordinating Bank';
      break;
    case 'upfront':
    case 'mandatedLeadArranger':
    case 'arranger':
      agentName = 'Facility Agent';
      break;
    default:
      agentName = 'Facility Agent';
  }

  output += `<div class="numbered-item"><p>12.</p><p class='para-content'>This ${agentName} Fee Letter may not be amended or waived except as may be agreed in writing by the ${agentName} and the Borrower.</p></div>\n`;
  output += `<div class="numbered-item"><p>13.</p><p class='para-content'>This ${agentName} Fee Letter may be signed in any number of counterparts. This has the same effect as if the signatures on the counterparts were on a single copy of this Fee Letter.</p></div>\n`;
  output += `<div class="numbered-item"><p>14.</p><p class='para-content'>A person who is not a party to this Fee Letter shall have no rights under the Contracts (Rights of Third Parties) Act 1999 or otherwise to enforce or enjoy the benefit of any terms of this Fee Letter.</p></div>\n`;
  output += `<div class="numbered-item"><p>15.</p><p class='para-content'>This letter and all non-contractual obligations arising from or connected with it are governed by ${data.governingLaw} law.</p></div>\n`;

  //For Jurisdiction Provision
  if (data.jurisdictionProvision === 'Standalone') {
    output += `<div class="numbered-item"><p>16.</p><p class='para-content'>Each party hereby submits to exclusive jurisdiction of the ${data.governingLaw} courts and waives any defence of forum non conveniens which may be available.</p></div>\n`;
  } else {
    output += `<div class="numbered-item"><p>16.</p><p class='para-content'>Clause {¢} (Enforcement) of the Facility Agreement shall apply to this Fee Letter as if set out in full in this Fee Letter mutatis mutandis, and references in those clauses to "this Agreement" or the Finance Documents shall be construed as references to this Fee Letter.</p></div>\n`;
  }

  // Signature blocks
  output += `By signing and returning a copy of this Fee Letter to the ${agentName}, you acknowledge your agreement to its terms.\n\n`;
  output += `<div><p>Yours faithfully</p></div></br>`;
  output += `<div><p>_______________</p></div></br>`;
  output += `<div><p>For and on behalf of</p><p><b>${getSenderName()}</b></p></div></br>`;
  output += `<div><p>Agreed and accepted by</p></div></br>`;
  output += `<div class='mb-5'><p>_______________</p></div></br>`;
  output += `<div><p>For and on behalf of</p><p><b>${data.borrowerName}</b></p></div>\n`;

  if (data?.indexClauses.length > 0) {
    // Updated regex to match all clause formats:
    const clausePattern =
      /clause\s*(?:\*\s*)?(?:{\s*)?(?:{\s*)?([^{()]+)(?:}\s*)?(?:}\s*)?\(\s*([^)]+?)\s*\)(?:\s*}\s*)?(?:\*\s*)?/gi;

    const replaceClauseWithNumber = (match: string, clauseValue: string, title: string) => {
      // Extract the original 'clause' text (preserving case)
      const originalClause = match.match(/^[Cc]lause/)?.[0] || 'Clause';

      const matchingClause = data.indexClauses.find(
        (clause: { title: string }) => clause.title.toLowerCase() === title.toLowerCase()
      );

      if (matchingClause) {
        return `${originalClause} ${matchingClause.clause} (${matchingClause.title}) `;
      }

      return match;
    };

    output = output.replace(clausePattern, replaceClauseWithNumber);
  }

  if (data?.definitions.length > 0) {
    const replaceDefinitionWordsWithSup = (text: string): string => {
      return text.replace(/\*\{([^}]+)\}\*/g, (_, defWord) => defWord);
    };
    output = replaceDefinitionWordsWithSup(output);
  }

  if (data?.definitions?.length > 0) {
    output = normalizeLetterTerms(output, data?.definitions);

    // Replace variations in letter content
  }

  output = convertSimpleOutput(output);

  return output;
};

const convertSimpleOutput = (letterText: string) => {
  if (!letterText) return '';

  // First, remove {[ and ]} brackets while preserving content
  const cleanedText = letterText.replace(/\{\[/g, '').replace(/\]\}/g, '');

  // Then handle the remaining *{...}* patterns
  return cleanedText.replace(/\*\{\s*(?:\[|\{)?([^}\]\)]+)(?:\]|\})?(?:\s*\(([^}]+)\))?\s*\}\*/g, (_, ref, title) => {
    if (ref && title) {
      return `${ref.trim()} (${title.trim()})`;
    }
    return ref.trim();
  });
};

const buildDefinitionReplacementMap = (
  definitions: string[],
  variations: Record<string, string>
): Record<string, string> => {
  const replacements: Record<string, string> = {};
  for (const [key, value] of Object.entries(variations)) {
    if (definitions.includes(key)) {
      replacements[value] = key;
    } else if (definitions.includes(value)) {
      replacements[key] = value;
    }
  }
  return replacements;
};

// Replace in text
const normalizeLetterTerms = (letterText: string, definitions: string[]): string => {
  const replacements = buildDefinitionReplacementMap(definitions, definitionList);
  const pattern = new RegExp(`\\b(${Object.keys(replacements).join('|')})\\b`, 'g');
  return letterText.replace(pattern, (match) => replacements[match]);
};

export const definitionList = {
  'Finance Documents': 'Financing Documents',
  'Financing Documents': 'Finance Documents',
  'Utilisation Request': 'Drawdown Notice',
  'Drawdown Notice': 'Utilisation Request',
  'Final Maturity Date': 'Termination Date',
  'Termination Date': 'Final Maturity Date',
};
