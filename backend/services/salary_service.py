import math

def calculate_salary(ctc):
    try:
        ctc = float(str(ctc).replace(",", ""))
    except:
        return {}

    # ==============================
    # BASIC
    # ==============================
    basic = ctc * 0.40
    hra = basic * 0.40

    # Fixed
    lta = 50000
    mobile = 12000
    broadband = 12000
    book = 12000
    gym = 18000
    insurance = 15000
    term_insurance = 2000

    # PF
    employee_pf = basic * 0.12

    if (basic / 12) >= 15000:
        employer_pf = 21600
    else:
        employer_pf = basic * 0.12

    # Gratuity
    gratuity = round((basic / 12) * 15 / 26)

    # Annual Gross
    annual_gross = ctc - (17000 + employer_pf + gratuity)

    # Special Allowance
    special_allowance = annual_gross - (
        basic + hra + 104000 + employee_pf
    )

    def monthly(x):
        return round(x / 12)

    return {
        # Annual + Monthly
        "Basic": round(basic),
        "Basic_Monthly": monthly(basic),

        "HRA": round(hra),
        "HRA_Monthly": monthly(hra),

        "Special_Allowance": round(special_allowance),
        "Special_Allowance_Monthly": monthly(special_allowance),

        "LTA": lta,
        "LTA_Monthly": monthly(lta),

        "Mobile": mobile,
        "Mobile_Monthly": monthly(mobile),

        "Broadband": broadband,
        "Broadband_Monthly": monthly(broadband),

        "Gym": gym,
        "Gym_Monthly": monthly(gym),

        "Book": book,
        "Book_Monthly": monthly(book),

        "Employee_PF": round(employee_pf),
        "Employee_PF_Monthly": monthly(employee_pf),

        "Annual_Gross": round(annual_gross),
        "Annual_Gross_Monthly": monthly(annual_gross),

        "Insurance": insurance,
        "Insurance_Monthly": monthly(insurance),

        "Employer_PF": round(employer_pf),
        "Employer_PF_Monthly": monthly(employer_pf),

        "Gratuity": gratuity,
        "Gratuity_Monthly": monthly(gratuity),

        "CTC": round(ctc),
        "CTC_Monthly": monthly(ctc),
    }