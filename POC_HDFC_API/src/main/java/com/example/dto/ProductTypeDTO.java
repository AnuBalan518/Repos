package com.example.dto;

import javax.persistence.Column;
import javax.validation.constraints.*;
import java.time.LocalDateTime;

public class ProductTypeDTO {

    private Integer id;

    @NotBlank(message = "Type is mandatory")
    @Column(nullable = false)
    private String name;

    // Original keys
    @NotBlank(message = "Type is mandatory")
    @Column(nullable = false)
    private String type;

    @NotBlank(message = "Intermediary is mandatory")
    @Column(nullable = false)
    private String intermediary;

    @NotBlank(message = "Frequency is mandatory")
    @Column(nullable = false)
    private String frequency;

    @NotBlank(message = "Installment Type is mandatory")
    @Column(nullable = false)
    private String installmentType;

    @NotBlank(message = "UIN Number is mandatory")
    @Column(nullable = false)
    private String uinNumber;

    @NotNull(message = "Age At Entry is mandatory")
    @Min(value = 0, message = "Age At Entry must be a non-negative number")
    @Column(nullable = false)
    private Integer ageAtEntry;

    @NotNull(message = "Maturity Age is mandatory")
    @Min(value = 0, message = "Maturity Age must be a non-negative number")
    @Column(nullable = false)
    private Integer maturityAge;

    @NotNull(message = "Premium Term is mandatory")
    @Min(value = 0, message = "Premium Term must be a non-negative number")
    @Column(nullable = false)
    private Integer premiumTerm;

    @NotNull(message = "Limited Premium Term is mandatory")
    @Min(value = 0, message = "Limited Premium must be a non-negative number")
    @Column(nullable = false)
    private Integer limitedPremiumTerm;

    @NotNull(message = "Policy Term is mandatory")
    @Min(value = 0, message = "Policy Term must be a non-negative number")
    @Column(nullable = false)
    private Integer policyTerm;

    @NotBlank(message = "Installment Premium is mandatory")
    @Column(nullable = false)
    private String installmentPremium;

    @NotNull(message = "Single Premium is mandatory")
    @Min(value = 0, message = "Single Premium must be a non-negative number")
    @Column(nullable = false)
    private Long singlePremium;

    @NotNull(message = "Annuity Purchase Price is mandatory")
    @Min(value = 0, message = "Annuity Purchase Price must be a non-negative number")
    @Column(nullable = false)
    private Long annuityPurchasePrice;

    @NotNull(message = "Sum Assured is mandatory")
    @Min(value = 0, message = "Sum Assured must be a non-negative number")
    @Column(nullable = false)
    private Long sumAssured;

    @NotNull(message = "Product Launch Date is mandatory")
    @FutureOrPresent(message = "Product launch date must be today or in the future")
    @Column(nullable = false)
    private LocalDateTime productLaunchDate;

    @NotNull(message = "Product Exit Date is mandatory")
    @FutureOrPresent(message = "Product exit date must be today or in the future")
    @Column(nullable = false)
    private LocalDateTime productExitDate;

    @NotBlank(message = "Clawback is mandatory")
    @Column(nullable = false)
    private String clawback;

    @NotNull(message = "CreatedAt is mandatory")
    @Column(nullable = false)
    private LocalDateTime createdAt;

    @NotNull(message = "ModifiedAt is mandatory")
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @NotBlank(message = "ApprovalStatus is mandatory")
    @Column(nullable = true)
    private String approvalstatus;

    @NotBlank(message = "Status is mandatory")
    @Column(nullable = false)
    private String status;

    // Getters and setters

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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getIntermediary() {
        return intermediary;
    }

    public void setIntermediary(String intermediary) {
        this.intermediary = intermediary;
    }

    public String getFrequency() {
        return frequency;
    }

    public void setFrequency(String frequency) {
        this.frequency = frequency;
    }

    public String getInstallmentType() {
        return installmentType;
    }

    public void setInstallmentType(String installmentType) {
        this.installmentType = installmentType;
    }

    public String getUinNumber() {
        return uinNumber;
    }

    public void setUinNumber(String uinNumber) {
        this.uinNumber = uinNumber;
    }

    public Integer getAgeAtEntry() {
        return ageAtEntry;
    }

    public void setAgeAtEntry(Integer ageAtEntry) {
        this.ageAtEntry = ageAtEntry;
    }

    public Integer getMaturityAge() {
        return maturityAge;
    }

    public void setMaturityAge(Integer maturityAge) {
        this.maturityAge = maturityAge;
    }

    public Integer getPremiumTerm() {
        return premiumTerm;
    }

    public void setPremiumTerm(Integer premiumTerm) {
        this.premiumTerm = premiumTerm;
    }

    public Integer getLimitedPremiumTerm() {
        return limitedPremiumTerm;
    }

    public void setLimitedPremiumTerm(Integer limitedPremiumTerm) {
        this.limitedPremiumTerm = limitedPremiumTerm;
    }

    public Integer getPolicyTerm() {
        return policyTerm;
    }

    public void setPolicyTerm(Integer policyTerm) {
        this.policyTerm = policyTerm;
    }

    public String getInstallmentPremium() {
        return installmentPremium;
    }

    public void setInstallmentPremium(String installmentPremium) {
        this.installmentPremium = installmentPremium;
    }

    public Long getSinglePremium() {
        return singlePremium;
    }

    public void setSinglePremium(Long singlePremium) {
        this.singlePremium = singlePremium;
    }

    public Long getAnnuityPurchasePrice() {
        return annuityPurchasePrice;
    }

    public void setAnnuityPurchasePrice(Long annuityPurchasePrice) {
        this.annuityPurchasePrice = annuityPurchasePrice;
    }

    public Long getSumAssured() {
        return sumAssured;
    }

    public void setSumAssured(Long sumAssured) {
        this.sumAssured = sumAssured;
    }

    public LocalDateTime getProductLaunchDate() {
        return productLaunchDate;
    }

    public void setProductLaunchDate(LocalDateTime productLaunchDate) {
        this.productLaunchDate = productLaunchDate;
    }

    public LocalDateTime getProductExitDate() {
        return productExitDate;
    }

    public void setProductExitDate(LocalDateTime productExitDate) {
        this.productExitDate = productExitDate;
    }

    public String getClawback() {
        return clawback;
    }

    public void setClawback(String clawback) {
        this.clawback = clawback;
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

    public String getApprovalstatus() {
        return approvalstatus;
    }

    public void setApprovalstatus(String approvalstatus) {
        this.approvalstatus = approvalstatus;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
