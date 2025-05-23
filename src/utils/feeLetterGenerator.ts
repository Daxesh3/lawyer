import { IFacilityUploadDetails } from '../features/LetterCreation/interface/Letter.interface';
import { IFeeLetterData } from '../types/feeLetterTypes';

export const generateFeeLetterText = (data: IFeeLetterData, facilityUploadDetails: IFacilityUploadDetails) => {
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
  output += `${getLetterTitle()}\n\n`;

  // Addressee
  output += `To: ${data.borrowerName}\n\n`;

  // Sender
  output += `From: ${getSenderName()}\n\n`;

  // Date
  output += `Date: ${data.currentYear}\n\n`;

  // Salutation
  output += `Dear Sir/Madam\n\n`;

  // Header
  output += `${data.currency}${data.amount}${data.facilityType} (the "Facility Agreement") dated on or about the date hereof and made between, amongst others, ${data.borrowerName} as borrower (the "Borrower") and ${data.facilityAgentName} as facility agent (the "Facility Agent")\n\n`;

  // Introduction
  output += `1. We refer to the Facility Agreement.\n\n`;
  output += `2. Unless otherwise defined in this Fee Letter, terms defined in the Facility Agreement shall have the same meaning in this Fee Letter. The rules of interpretation and construction contained in clause *{[1.2] (Construction)}* of the Facility Agreement shall apply to this Fee Letter as if set out in full in this Fee Letter mutatis mutandis, and references in those clauses to "this Agreement" or the *{Finance Documents}* shall be construed as references to this Fee Letter.\n\n`;

  // Specific introduction based on letter type
  switch (data.letterType) {
    case 'facilityAgent':
      output += `3. This Letter is the Facility Agent Fee Letter.\n\n`;
      break;
    case 'securityAgent':
      output += `3. This Letter is the Security Agent Fee Letter.\n\n`;
      break;
    case 'globalCoordinator':
      output += `3. This Letter is the Global Co-Ordinator Fee Letter.\n\n`;
      break;
    case 'coordinatingBank':
      output += `3. This Letter is the Co-Ordinating Bank Fee Letter.\n\n`;
      break;
    case 'upfront':
      output += `3. This Letter is the Upfront Fee Letter.\n\n`;
      break;
    case 'mandatedLeadArranger':
      output += `3. This Letter is the Mandated Lead Arranger Fee Letter.\n\n`;
      break;
    case 'arranger':
      output += `3. This Letter is the Arranger Fee Letter.\n\n`;
      break;
    default:
      output += `3. This Letter is the Facility Agent Fee Letter.\n\n`;
  }

  // Add the letter type as a Finance Document
  output += `4. This ${getLetterTitle()
    .replace(/\(|\)/g, '')
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')} is a *{Finance Documents}* for the purposes of the Facility Agreement.\n\n`;

  // Fees section based on letter type
  switch (data.letterType) {
    case 'facilityAgent':
      if (data.hasFacilityAgentOptions) {
        output += `5. You shall pay to the Facility Agent (for its own account):\n\n`;

        if (data.setupFeeAmount) {
          output += `(a) a one-off set-up fee in an amount of ${data.currency} ${data.setupFeeAmount} (the "Set-Up Fee"),\n\n`;
        }

        output += `(b) a fee of ${data.currency}${data.facilityAgentFeeAmount} per annum, which is payable in advance, for the Facility Agent acting as facility agent pursuant to the provisions of the Facility Agreement (the "Facility Agent Fee"),\n\n`;

        if (data.increaseFeeAmount) {
          output += `(c) a fee of ${data.currency} ${data.increaseFeeAmount} if the Borrower exercises the Increase Option more than ${data.increaseCount} times (the "Increase Fee"), and\n\n`;
        }

        if (data.debtdomainFeeAmount) {
          output += `(d) a fee of ${data.currency}${data.debtdomainFeeAmount} per annum, which is payable in advance, for the use of a publishing system known as Debtdomain to assist in certain administrative tasks specific to the Facility Agent under the terms of the Facility Agreement (the "Debtdomain Fee"). The Facility Agent reserves the right to increase the Debtdomain Fee at its discretion if Debtdomain charges increase provided always that such increase of the Debtdomain Fee shall be more than the increase of Debtdomain charges.\n\n`;
        }

        output += `(e) The Set-Up Fee, Facility Agent Fee, Increase Fee and Debtdomain Fee shall hereinafter be referred to as the "Agency Fees".\n\n`;
      } else {
        output += `Only one type: facility agent pursuant to the provisions of the Facility Agreement (an "Facility Agent Fee").\n\n`;
      }
      break;

    case 'securityAgent':
      output += `5. You shall pay to the Security Agent (for its own account) a fee of ${data.currency} ${data.securityAgentFeeAmount} per annum, which is payable in advance, for the Security Agent acting as security agent pursuant to the provisions of the Facility Agreement (the "Security Agent Fee").\n\n`;
      break;

    case 'globalCoordinator':
      output += `5. You shall pay to the Global Co-Ordinator (for its own account) a flat fee of ${data.currency} ${data.globalCoordinatorFeeAmount} for the Global Co-Ordinator acting as global co-ordinator pursuant to the provisions of the Facility Agreement (the "Global Co-Ordinator Bank Fee").\n\n`;
      break;

    case 'coordinatingBank':
      output += `5. You shall pay to the Co-Ordinating Bank (for its own account) a flat fee of ${data.currency}${data.coordinatingBankFeeAmount} for the CoOrdinating Bank acting as co-ordinating bank pursuant to the provisions of the Facility Agreement (the "CoOrdinating Bank Fee").\n\n`;
      break;

    case 'upfront':
      output += `5. You shall pay to the Facility Agent (for the account of the *{Original Lenders}*) a fee of ${data.currency} ${data.upfrontFeeAmount} for the *{Original Lenders}* extending their Commitments to the Borrower under the Facility Agreement (an "Upfront Fee"). Each *{Original Lender}* shall be entitled to its pro rata share of the Upfront Fee. Its pro rata share shall be equal to the proportion its Commitment bears to the Total Commitment.\n\n`;
      break;

    case 'mandatedLeadArranger':
      output += `5.You shall pay to the Facility Agent (for the account of the *{Mandated Lead Arrangers}*) a fee of ${data.currency} ${data.mandatedLeadArrangerFeeAmount} for the *{Mandated Lead Arrangers}* under the Facility Agreement (an "Mandated Lead Arranger Fee"). Each *{Mandated Lead Arranger}* shall be entitled to its pro rata share of the Mandated Lead Arranger Fee. Its pro rata share shall be equal to the proportion its Commitment bears to the Total Commitment of all the *{Mandated Lead Arrangers}*\n\n`;
      break;

    case 'arranger':
      output += `5. You shall pay to the Facility Agent (for the account of the *{Arrangers}*) a fee of ${data.currency} ${data.arrangerFeeAmount} for the *{Arrangers}* under the Facility Agreement (an "Arranger Fee"). Each *{Arranger}* shall be entitled to its pro rata share of the Arranger Fee. Its pro rata share shall be equal to the proportion its Commitment bears to the Total Commitment of all the *{Arrangers}*\n\n`;
      break;

    default:
      // Default to facility agent
      output += `Only one type: facility agent pursuant to the provisions of the Facility Agreement (an "Facility Agent Fee").\n\n`;
  }

  // Payment Modalities based on letter type
  switch (data.letterType) {
    case 'facilityAgent':
      if (data.hasFacilityAgentOptions) {
        output += `Payment Modalities Facility Agent (More than one type)\n6. The Agency Fees shall become due and payable as set out below.\n`;
        output += `(a) The Set-Up Fee is payable on or before the earlier to occur of the date falling {[${data.businessDays}]} *{Business Days}* after the date of the Facility Agreement and the first *{Utilisation Date}* under the Facility Agreement (the "First Payment Date").\n`;

        if (data.paymentModality === 'annual') {
          output += `(b) The first payment of the Facility Agent Fee is payable on or before [the earlier to occur of the date falling {[${data.businessDays}]} *{Business Days}* after the date of the Facility Agreement and the first *{Utilisation Date}* under the Facility Agreement (the "FirstPayment Date")][the First Payment Date]. Each subsequent payment of the Facility Agent Fee shall be made annually in advance, commencing on the first anniversary of the First Payment Date and thereafter on each subsequent anniversary of the First Payment Date, until (but excluding) the earlier of(i) the *{Final Maturity Date}*, (ii) the date we resign or are replaced as facility agent and (iii) the date of prepayment of all *{Loans}* and cancellation - of all *{Commitments}*, in each case under the Facility Agreement (the "Final Payment Date").\n`;
        } else if (data.paymentModality === 'semiannual') {
          output += `(b) The Facility Agent Fee shall be payable to us in equal semi-annual instalments. Each installment shall amount to half of the annual Facility Agent Fee. The first installment of the Facility Agent Fee is payable on or before the First Payment Date. Thereafter any subsequent installment of the FacilityAgent Fee shall be made to us on the dates falling at intervals of six (6) months until (but excluding) the earlier of (i) the *{Final Maturity Date}*, (ii) the date we resign or are replaced as agent and (iii) the date of prepayment of all Loans and cancellation of all Commitments, in each case under the Facility Agreement (the "Final Payment Date").\n`;
        } else if (data.paymentModality === 'quarterly') {
          output += `(b) The Facility Agent Fee shall be payable to us in equal quarterly instalments. Each instrument shall amount to a quarter of the annual Facility Agent Fee. The first installment of the Facility Agent Fee is payable on or before [the earlier to occur of the date falling {[${data.businessDays}]} *{Business Days}* after the date of the Facility Agreement and the first *{Utilisation Date}* under the Facility Agreement (the "First Payment Date")] [the First Payment Date]. Thereafter any subsequent installment of the Facility Agent Fee shall be made to us on the dates falling at intervals of three (3) months until (but excluding) the earlier of (i) the *{Final Maturity Date}*, (ii) the date we resign or are replaced as agent and (iii) the date of prepayment of all Loans and cancellation of all Commitments, in each case under the Facility Agreement (the "Final Payment Date").\n`;
        }

        output += `\n(c) The Increase Fee shall be payable to the Facility Agent on or prior to the date falling {[${data.businessDays}]} *{Business Days}* after the Increase Date and on or prior to the date falling {[${data.businessDays}]} *{Business Days}* after each subsequent Increase Date.\n`;
        output += `(d) The first payment of the Debtdomain Fee is payable on or before the First Payment Date. Each subsequent payment of the Debtdomain Fee shall be made annually in advance, commencing on the first anniversary of the First Payment Date and thereafter on each subsequent anniversary of the First Payment Date, until the Final Payment Date.\n\n`;
      }
      break;

    case 'securityAgent':
      output += `Payment Modalities Security Agent\n[Optional]\n`;

      if (data.paymentModality === 'annual') {
        output += `6. The first payment of the Security Agent Fee is payable on or before the earlier to occur of the date falling {[${data.businessDays}]} *{Business Days}* after the date of the Facility Agreement and the first *{Utilisation Date}* under the Facility Agreement (the "First Payment Date"). Each subsequent payment of the Security Agent Fee shall be made annually in advance, commencing on the fist anniversary of the First Payment Date and thereafter on each subsequent anniversary of the First Payment Date, until (but excluding) the earlier of(i) the *{Final Maturity Date}*, (ii) the date we resign or are replaced as facility agent and (iii) the date of prepayment of all *{Loans}* and cancellation of all *{Commitments}*, in each case under the Facility Agreement.\n\n`;
      } else if (data.paymentModality === 'semiannual') {
        output += `The Security Agent Fee shall be payable to us in equal semi-annual instalments. Each installment shall amount to half of the annual Security Agent Fee. The first installment of the Security Agent Fee is payable on or before the earlier to occur of the date falling {[${data.businessDays}]} *{Business Days}* after the date of the Facility Agreement and the first *{Utilisation Date}* under the Facility Agreement (the "First Payment Date"). Thereafter any subsequent installment of the Security Agent Fee shall be made to us on the dates falling at intervals of six (6) months until (but excluding) the earlier of (i) the *{Final Maturity Date}*, (ii) the date we resign or are replaced as agent and (iii) the date of prepayment of all Loans and cancellation of all Commitments, in each case under the Facility Agreement.\n\n`;
      } else if (data.paymentModality === 'quarterly') {
        output += `The Security Agent Fee shall be payable to us in equal quarterly instalments. Each installment shall amount to a quarter of the annual Security Agent Fee. The first installment of the Security Agent Fee is payable on or before the earlier to occur of the date falling {[${data.businessDays}]} *{Business Days}* after the date of the Facility Agreement and the first *{Uti1isation Date}* under the Facility Agreement (the "First Payment Date"). Thereafter any subsequent installment of the Security Agent Fee shall be made to us on the dates falling at intervals of three (3) months until (but excluding) the earlier of (i) the *{Final Maturity Date}*, (ii) the date we resign or are replaced as agent and (iii) the date of prepayment of all Loans and cancellation of all Commitments, in each case under the Facility Agreement.\n\n`;
      }
      break;

    case 'globalCoordinator':
      output += `Payment Modalities Global Co-Ordinating Bank\n: 6. The Global Co-ordinator Fee is payable on or before the earlier to occur of the date falling {[${data.businessDays}]} *{Business Days}* after the date of the Facility Agreement and the first *{Utilisation Date}* under the Facility Agreement.\n\n`;
      break;

    case 'coordinatingBank':
      output += `Payment Modalities Co-Ordinating Bank\n: 6. The Co-ordinating Bank Fee is payable on or before the earlier to occur of the date falling {[${data.businessDays}]} *{Business Days}* after the date of the Facility Agreement and the first *{Utilisation Date}* under the Facility Agreement.\n\n`;
      break;

    case 'upfront':
      output += `Payment Modalities Upfront\n: 6. The Upfront Fee is payable on or before the earlier to occur of the date falling {[${data.businessDays}]} *{Business Days}* after the date of the Facility Agreement and the first *{Utilisation Date}* under the Facility Agreement.\n\n`;
      break;

    case 'mandatedLeadArranger':
      output += `Payment Modalities Mandate Lead Arranger\n: 6. The Mandated Lead Arranger Fee is payable on or before the earlier to occur of the date falling {[${data.businessDays}]} *{Business Days}* after the date of the Facility Agreement and the first *{Utilisation Date}* under the Facility Agreement.\n\n`;
      break;

    case 'arranger':
      output += `Payment Modalities Arranger\n: 6. The Arranger Fee is payable on or before the earlier to occur of the date falling {[${data.businessDays}]} *{Business Days}* after the date of the Facility Agreement and the first *{Utilisation Date}* under the Facility Agreement.\n\n`;
      break;

    default:
      break;
  }

  // Bank account details
  if (data.bankDetails.accountBank || data.bankDetails.accountNumber) {
    output += `7. All payments made by you under this Fee Letter must be made in immediately available, freely transferable and cleared funds by crediting the following bank account \nAccount Bank: ${data.bankDetails.accountBank}\nAccount Holder: ${data.bankDetails.accountHolder}\nAccount No.: ${data.bankDetails.accountNumber}\nSort Code: ${data.bankDetails.sortCode}\nIBAN: ${data.bankDetails.iban}\nRef: ${data.borrowerName}-${data.currency} ${data.amount} ${data.facilityType}\nor such other account as we may notify you in writing with {[${data.businessDays}]} *{Business Days'}* prior notice.\n\n`;
  } else {
    output += `7. A11 payments made by you under this Fee Letter must be made in immediately available, freely transferable and cleared funds by crediting our account (the details of which we have provided you with separately) or such other account as we may notify you in writing with {[${data.businessDays}]} *{Business Days'}*' prior notice.\n\n`;
  }

  // Tax and VAT
  output += `8. Clause *{ {12} (Tax Gross Up and Indemnities)}* of the Facility Agreement shall apply to this letter as if set out in full in this letter, mutatis mutandis, and references in that clause to Finance Documents shall be construed as including this Fee Letter.\n\n`;
  output += `9. Clause *{ {¢} (VAT)}* of the Facility Agreement shall apply to this letter as if set out in full in this letter, mutatis mutandis, and references in that clause to Finance Documents shall be construed as including this Fee Letter.\n\n`;

  // Fee refunds - only for facility agent and security agent
  if (data.letterType === 'facilityAgent' || data.letterType === 'securityAgent') {
    output += `10. The ${
      data.letterType === 'facilityAgent' ? 'Agency' : 'Security Agent'
    } Fees once paid are non-refundable (in whole or in part) and non-creditable (in whole or in part) against other fees in connection with the Facility Agreement\n\n`;
  }

  // Miscellaneous
  output += `11. This Fee Letter and your rights hereunder may not be assigned by you without our prior written consent.\n\n`;

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

  output += `12. This ${agentName} Fee Letter may not be amended or waived except as may be agreed in writing by the ${agentName} and the Borrower.\n\n`;
  output += `13. This ${agentName} Fee Letter may be signed in any number of counterparts. This has the same effect as if the signatures on the counterparts were on a single copy of this Fee Letter.\n\n`;
  output += `14. A person who is not a party to this Fee Letter shall have no rights under the Contracts (Rights of Third Parties) Act 1999 or otherwise to enforce or enjoy the benefit of any terms of this Fee Letter.\n\n`;
  output += `15. This letter and all non-contractual obligations arising from or connected with it are governed by ${data.governingLaw} law.\n\n`;
  output += `16. Clause {¢} (Enforcement) of the Facility Agreement shall apply to this Fee Letter as if set out in full in this Fee Letter mutatis mutandis, and references in those clauses to "this Agreement" or the Finance Documents shall be construed as references to this Fee Letter.\n\n`;

  // Signature blocks
  output += `By signing and returning a copy of this Fee Letter to the ${agentName}, you acknowledge your agreement to its terms.\n\n`;
  output += `Yours faithfully\n\n\n\n`;
  output += `_______________\n\n`;
  output += `For and on behalf of \n${getSenderName()}\n\n\n`;
  output += `Agreed and accepted by\n\n`;
  output += `_______________\n\n`;
  output += `For and on behalf of \n${data.borrowerName}\n`;

  if (facilityUploadDetails) {
    if (facilityUploadDetails.indexClauses.length > 0) {
      // Updated regex to match all clause formats:
      const clausePattern =
        /clause\s*(?:\*\s*)?(?:{\s*)?(?:{\s*)?([^{()]+)(?:}\s*)?(?:}\s*)?\(\s*([^)]+?)\s*\)(?:\s*}\s*)?(?:\*\s*)?/gi;

      const replaceClauseWithNumber = (match: string, clauseValue: string, title: string) => {
        // Extract the original 'clause' text (preserving case)
        const originalClause = match.match(/^[Cc]lause/)?.[0] || 'Clause';

        const matchingClause = facilityUploadDetails.indexClauses.find(
          (clause) => clause.title.toLowerCase() === title.toLowerCase()
        );

        if (matchingClause) {
          return `${originalClause} {${matchingClause.clause}} (${matchingClause.title}) `;
        }

        return match;
      };

      output = output.replace(clausePattern, replaceClauseWithNumber);
    }

    if (facilityUploadDetails.definitions.length > 0) {
      const replaceDefinitionWordsWithSup = (text: string): string => {
        return text.replace(/\*\{([^}]+)\}\*/g, (_, defWord) => {
          // Extract initials from the definition word
          const initials = defWord
            .split(/\s+/)
            .map((word: string) => word[0]?.toUpperCase() || '')
            .join('');

          return `${defWord} ${initials}`;
        });
      };
      output = replaceDefinitionWordsWithSup(output);
    }

    output = normalizeLetterTerms(output, facilityUploadDetails);

    // Replace variations in letter content
  }

  return output;
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
const normalizeLetterTerms = (letterText: string, details: IFacilityUploadDetails): string => {
  const replacements = buildDefinitionReplacementMap(details.definitions, details.variations);
  const pattern = new RegExp(`\\b(${Object.keys(replacements).join('|')})\\b`, 'g');
  return letterText.replace(pattern, (match) => replacements[match]);
};
