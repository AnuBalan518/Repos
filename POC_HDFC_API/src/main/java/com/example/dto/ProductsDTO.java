package com.example.dto;

import com.example.entity.Products;
import com.example.entity.ProductsData;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;

public class ProductsDTO {

    @NotNull(message = "ID cannot be null")
    private Integer id;

    @NotBlank(message = "Product name cannot be blank")
    private String name;

    @NotBlank(message = "Plan code cannot be blank")
    private String plan_code;

    @NotBlank(message = "Company code cannot be blank")
    private String company_code;

    @NotBlank(message = "Type cannot be blank")
    private String type;

    @NotBlank(message = "UIN number cannot be blank")
    private String uinNumber;

    @NotNull(message = "Minimum age at entry cannot be null")
    @Min(value = 0, message = "Minimum age at entry must be greater than or equal to 0")
    private Integer minAgeAtEntry;

    @NotNull(message = "Maximum age at entry cannot be null")
    @Max(value = 100, message = "Maximum age at entry must be less than or equal to 100")
    private Integer maxAgeAtEntry;

    @NotNull(message = "Minimum maturity age cannot be null")
    @Min(value = 0, message = "Minimum maturity age must be greater than or equal to 0")
    private Integer minMaturityAge;

    @NotNull(message = "Maximum maturity age cannot be null")
    @Max(value = 100, message = "Maximum maturity age must be less than or equal to 100")
    private Integer maxMaturityAge;

    @NotNull(message = "Minimum regular premium cannot be null")
    @Min(value = 1, message = "Minimum regular premium must be greater than or equal to 1")
    private Integer minRegularPremium;

    @NotNull(message = "Maximum regular premium cannot be null")
    @Min(value = 1, message = "Maximum regular premium must be greater than or equal to 1")
    private Integer maxRegularPremium;

    @NotNull(message = "Limited premium (1 year) cannot be null")
    private Integer limitedPremium1;

    @NotNull(message = "Limited premium (2 years) cannot be null")
    private Integer limitedPremium2;

    @NotNull(message = "Limited premium (3 years) cannot be null")
    private Integer limitedPremium3;

    @NotNull(message = "Limited premium (4 years) cannot be null")
    private Integer limitedPremium4;

    @NotNull(message = "Launch date cannot be null")
    private LocalDateTime launchDate;

    @NotNull(message = "Minimum policy term cannot be null")
    private Integer minPolicyTerm;

    @NotNull(message = "Maximum policy term cannot be null")
    private Integer maxPolicyTerm;

    @NotNull(message = "Minimum installment premium (yearly) cannot be null")
    private Integer minInstallmentPremiumYearly;

    @NotNull(message = "Maximum installment premium (yearly) cannot be null")
    private Integer maxInstallmentPremiumYearly;

    @NotNull(message = "Minimum installment premium (half-yearly) cannot be null")
    private Integer minInstallmentPremiumHalfYearly;

    @NotNull(message = "Maximum installment premium (half-yearly) cannot be null")
    private Integer maxInstallmentPremiumHalfYearly;

    @NotNull(message = "Minimum installment premium (quarterly) cannot be null")
    private Integer minInstallmentPremiumQuarterly;

    @NotNull(message = "Maximum installment premium (quarterly) cannot be null")
    private Integer maxInstallmentPremiumQuarterly;

    @NotNull(message = "Minimum installment premium (monthly) cannot be null")
    private Integer minInstallmentPremiumMonthly;

    @NotNull(message = "Maximum installment premium (monthly) cannot be null")
    private Integer maxInstallmentPremiumMonthly;

    @NotNull(message = "Minimum single premium amount cannot be null")
    private Integer minSinglePremiumAmount;

    @NotNull(message = "Maximum single premium amount cannot be null")
    private Integer maxSinglePremiumAmount;

    @NotNull(message = "Minimum annuity purchase price cannot be null")
    private Integer minAnnuityPurchasePrice;

    @NotNull(message = "Maximum annuity purchase price cannot be null")
    private Integer maxAnnuityPurchasePrice;

    @NotNull(message = "Minimum sum assured cannot be null")
    private Integer minSumAssured;

    @NotNull(message = "Maximum sum assured cannot be null")
    private Integer maxSumAssured;

    @NotNull(message = "Exit date cannot be null")
    private LocalDateTime exitDate;

    @NotBlank(message = "Cheque clearance cannot be blank")
    private String chequeClearance;

    @NotBlank(message = "Clawback cannot be blank")
    private String clawback;

    @NotBlank(message = "Bonus commission eligibility cannot be blank")
    private String bonusCommissionEligibility;

    @NotNull(message = "Bonus commission percentage cannot be null")
    @DecimalMin(value = "0.0", message = "Bonus commission percentage must be greater than or equal to 0.0")
    private BigDecimal bonusCommissionPercentage;

    @NotNull(message = "Created by cannot be null")
    private Integer createdBy;

    @NotNull(message = "Modified by cannot be null")
    private Integer modifiedBy;

    @NotNull(message = "Created at cannot be null")
    private LocalDateTime createdAt;

    @NotNull(message = "Updated at cannot be null")
    private LocalDateTime updatedAt;

    @NotBlank(message = "Approval status cannot be blank")
    private String approval_status;

    @NotBlank(message = "Status cannot be blank")
    private String status;

    private List<String> intermediary;
    private List<String> frequency;
    //@JsonProperty("premiumType")
    private List<String> premiumtype;

    private List<ProductsDataDTO> productsDataDTOS;

    // Getters and setters for all fields


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPlan_code() {
        return plan_code;
    }

    public void setPlan_code(String plan_code) {
        this.plan_code = plan_code;
    }

    public String getCompany_code() {
        return company_code;
    }

    public void setCompany_code(String company_code) {
        this.company_code = company_code;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getUinNumber() {
        return uinNumber;
    }

    public void setUinNumber(String uinNumber) {
        this.uinNumber = uinNumber;
    }

    public Integer getMinAgeAtEntry() {
        return minAgeAtEntry;
    }

    public void setMinAgeAtEntry(Integer minAgeAtEntry) {
        this.minAgeAtEntry = minAgeAtEntry;
    }

    public Integer getMaxAgeAtEntry() {
        return maxAgeAtEntry;
    }

    public void setMaxAgeAtEntry(Integer maxAgeAtEntry) {
        this.maxAgeAtEntry = maxAgeAtEntry;
    }

    public Integer getMinMaturityAge() {
        return minMaturityAge;
    }

    public void setMinMaturityAge(Integer minMaturityAge) {
        this.minMaturityAge = minMaturityAge;
    }

    public Integer getMaxMaturityAge() {
        return maxMaturityAge;
    }

    public void setMaxMaturityAge(Integer maxMaturityAge) {
        this.maxMaturityAge = maxMaturityAge;
    }

    public Integer getMinRegularPremium() {
        return minRegularPremium;
    }

    public void setMinRegularPremium(Integer minRegularPremium) {
        this.minRegularPremium = minRegularPremium;
    }

    public Integer getMaxRegularPremium() {
        return maxRegularPremium;
    }

    public void setMaxRegularPremium(Integer maxRegularPremium) {
        this.maxRegularPremium = maxRegularPremium;
    }

    public Integer getLimitedPremium1() {
        return limitedPremium1;
    }

    public void setLimitedPremium1(Integer limitedPremium1) {
        this.limitedPremium1 = limitedPremium1;
    }

    public Integer getLimitedPremium2() {
        return limitedPremium2;
    }

    public void setLimitedPremium2(Integer limitedPremium2) {
        this.limitedPremium2 = limitedPremium2;
    }

    public Integer getLimitedPremium3() {
        return limitedPremium3;
    }

    public void setLimitedPremium3(Integer limitedPremium3) {
        this.limitedPremium3 = limitedPremium3;
    }

    public Integer getLimitedPremium4() {
        return limitedPremium4;
    }

    public void setLimitedPremium4(Integer limitedPremium4) {
        this.limitedPremium4 = limitedPremium4;
    }

    public LocalDateTime getLaunchDate() {
        return launchDate;
    }

    public void setLaunchDate(LocalDateTime launchDate) {
        this.launchDate = launchDate;
    }

    public Integer getMinPolicyTerm() {
        return minPolicyTerm;
    }

    public void setMinPolicyTerm(Integer minPolicyTerm) {
        this.minPolicyTerm = minPolicyTerm;
    }

    public Integer getMaxPolicyTerm() {
        return maxPolicyTerm;
    }

    public void setMaxPolicyTerm(Integer maxPolicyTerm) {
        this.maxPolicyTerm = maxPolicyTerm;
    }

    public Integer getMinInstallmentPremiumYearly() {
        return minInstallmentPremiumYearly;
    }

    public void setMinInstallmentPremiumYearly(Integer minInstallmentPremiumYearly) {
        this.minInstallmentPremiumYearly = minInstallmentPremiumYearly;
    }

    public Integer getMaxInstallmentPremiumYearly() {
        return maxInstallmentPremiumYearly;
    }

    public void setMaxInstallmentPremiumYearly(Integer maxInstallmentPremiumYearly) {
        this.maxInstallmentPremiumYearly = maxInstallmentPremiumYearly;
    }

    public Integer getMinInstallmentPremiumHalfYearly() {
        return minInstallmentPremiumHalfYearly;
    }

    public void setMinInstallmentPremiumHalfYearly(Integer minInstallmentPremiumHalfYearly) {
        this.minInstallmentPremiumHalfYearly = minInstallmentPremiumHalfYearly;
    }

    public Integer getMaxInstallmentPremiumHalfYearly() {
        return maxInstallmentPremiumHalfYearly;
    }

    public void setMaxInstallmentPremiumHalfYearly(Integer maxInstallmentPremiumHalfYearly) {
        this.maxInstallmentPremiumHalfYearly = maxInstallmentPremiumHalfYearly;
    }

    public Integer getMinInstallmentPremiumQuarterly() {
        return minInstallmentPremiumQuarterly;
    }

    public void setMinInstallmentPremiumQuarterly(Integer minInstallmentPremiumQuarterly) {
        this.minInstallmentPremiumQuarterly = minInstallmentPremiumQuarterly;
    }

    public Integer getMaxInstallmentPremiumQuarterly() {
        return maxInstallmentPremiumQuarterly;
    }

    public void setMaxInstallmentPremiumQuarterly(Integer maxInstallmentPremiumQuarterly) {
        this.maxInstallmentPremiumQuarterly = maxInstallmentPremiumQuarterly;
    }

    public Integer getMinInstallmentPremiumMonthly() {
        return minInstallmentPremiumMonthly;
    }

    public void setMinInstallmentPremiumMonthly(Integer minInstallmentPremiumMonthly) {
        this.minInstallmentPremiumMonthly = minInstallmentPremiumMonthly;
    }

    public Integer getMaxInstallmentPremiumMonthly() {
        return maxInstallmentPremiumMonthly;
    }

    public void setMaxInstallmentPremiumMonthly(Integer maxInstallmentPremiumMonthly) {
        this.maxInstallmentPremiumMonthly = maxInstallmentPremiumMonthly;
    }

    public Integer getMinSinglePremiumAmount() {
        return minSinglePremiumAmount;
    }

    public void setMinSinglePremiumAmount(Integer minSinglePremiumAmount) {
        this.minSinglePremiumAmount = minSinglePremiumAmount;
    }

    public Integer getMaxSinglePremiumAmount() {
        return maxSinglePremiumAmount;
    }

    public void setMaxSinglePremiumAmount(Integer maxSinglePremiumAmount) {
        this.maxSinglePremiumAmount = maxSinglePremiumAmount;
    }

    public Integer getMinAnnuityPurchasePrice() {
        return minAnnuityPurchasePrice;
    }

    public void setMinAnnuityPurchasePrice(Integer minAnnuityPurchasePrice) {
        this.minAnnuityPurchasePrice = minAnnuityPurchasePrice;
    }

    public Integer getMaxAnnuityPurchasePrice() {
        return maxAnnuityPurchasePrice;
    }

    public void setMaxAnnuityPurchasePrice(Integer maxAnnuityPurchasePrice) {
        this.maxAnnuityPurchasePrice = maxAnnuityPurchasePrice;
    }

    public Integer getMinSumAssured() {
        return minSumAssured;
    }

    public void setMinSumAssured(Integer minSumAssured) {
        this.minSumAssured = minSumAssured;
    }

    public Integer getMaxSumAssured() {
        return maxSumAssured;
    }

    public void setMaxSumAssured(Integer maxSumAssured) {
        this.maxSumAssured = maxSumAssured;
    }

    public LocalDateTime getExitDate() {
        return exitDate;
    }

    public void setExitDate(LocalDateTime exitDate) {
        this.exitDate = exitDate;
    }

    public String getChequeClearance() {
        return chequeClearance;
    }

    public void setChequeClearance(String chequeClearance) {
        this.chequeClearance = chequeClearance;
    }

    public String getClawback() {
        return clawback;
    }

    public void setClawback(String clawback) {
        this.clawback = clawback;
    }

    public String getBonusCommissionEligibility() {
        return bonusCommissionEligibility;
    }

    public void setBonusCommissionEligibility(String bonusCommissionEligibility) {
        this.bonusCommissionEligibility = bonusCommissionEligibility;
    }

    public BigDecimal getBonusCommissionPercentage() {
        return bonusCommissionPercentage;
    }

    public void setBonusCommissionPercentage(BigDecimal bonusCommissionPercentage) {
        this.bonusCommissionPercentage = bonusCommissionPercentage;
    }

    public Integer getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Integer createdBy) {
        this.createdBy = createdBy;
    }

    public Integer getModifiedBy() {
        return modifiedBy;
    }

    public void setModifiedBy(Integer modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getApproval_status() {
        return approval_status;
    }

    public void setApproval_status(String approval_status) {
        this.approval_status = approval_status;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<String> getIntermediary() {
        return intermediary;
    }

    public void setIntermediary(List<String> intermediary) {
        this.intermediary = intermediary;
    }

    public List<String> getFrequency() {
        return frequency;
    }

    public void setFrequency(List<String> frequency) {
        this.frequency = frequency;
    }

    public List<String> getPremiumtype() {
        return premiumtype;
    }

    public void setPremiumtype(List<String> premiumtype) {
        this.premiumtype = premiumtype;
    }
}
