package com.example.entity;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "producttype", uniqueConstraints = {
		@UniqueConstraint(columnNames = {"name", "type"})
})
public class ProductType {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(length = 50, nullable = false)
	private String name;

	@Column(length = 100, nullable = false)
	private String type; // maps to app_config.config_key

	@Column(name = "uin_number", length = 15, nullable = false)
	private String uinNumber;

	@Column(length = 100, nullable = false)
	private String intermediary; // maps to app_config.config_key

	@Column(length = 100, nullable = false)
	private String frequency; // maps to app_config.config_key

	@Column(name = "age_at_entry", nullable = false)
	private Integer ageAtEntry;

	@Column(name = "maturity_age", nullable = false)
	private Integer maturityAge;

	@Column(name = "premium_term", nullable = false)
	private Integer premiumTerm;

	@Column(name = "limited_premium_term", nullable = false)
	private Integer limitedPremiumTerm;

	@Column(name = "policy_term", nullable = false)
	private Integer policyTerm;

	@Column(name = "installment_type", length = 100, nullable = false)
	private String installmentType; // maps to app_config.config_key

	@Column(name = "installment_premium", length = 100, nullable = false)
	private String installmentPremium;

	@Column(name = "single_premium", nullable = false)
	private Long singlePremium;

	@Column(name = "annuity_purchase_price", nullable = false)
	private Long annuityPurchasePrice;

	@Column(name = "sum_assured", nullable = false)
	private Long sumAssured;

	@Column(name = "product_launch_date", nullable = false)
	private LocalDateTime productLaunchDate;

	@Column(name = "product_exit_date", nullable = false)
	private LocalDateTime productExitDate;

	@Column(length = 1)
	private String clawback;

	@Column(name = "created_at", updatable = false)
	private LocalDateTime createdAt;

	@Column(name = "updated_at")
	private LocalDateTime updatedAt;

	@Column(name = "approvalstatus")
	private String approvalStatus;

	@Column(name = "status")
	private String status;

	@PrePersist
	protected void onCreate() {
		this.createdAt = LocalDateTime.now();
		this.updatedAt = LocalDateTime.now();
	}

	@PreUpdate
	protected void onUpdate() {
		this.updatedAt = LocalDateTime.now();
	}

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

	public String getUinNumber() {
		return uinNumber;
	}

	public void setUinNumber(String uinNumber) {
		this.uinNumber = uinNumber;
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

	public String getInstallmentType() {
		return installmentType;
	}

	public void setInstallmentType(String installmentType) {
		this.installmentType = installmentType;
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

	public String getApprovalStatus() {
		return approvalStatus;
	}

	public void setApprovalStatus(String approvalStatus) {
		this.approvalStatus = approvalStatus;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}
