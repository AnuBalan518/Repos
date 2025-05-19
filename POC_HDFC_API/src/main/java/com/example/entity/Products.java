package com.example.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "products", uniqueConstraints = {
		@UniqueConstraint(columnNames = {"name", "type"})
})
public class Products {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name="name", length = 50, nullable = false)
	private String name;

	@Column(name = "plan_code", length = 50, nullable = false)
	private String plan_code;

	@Column(name = "company_code", length = 50, nullable = false)
	private String company_code;

	@Column(name="type", length = 100, nullable = false)
	private String type;

	@Column(name = "uin_number", length = 15, nullable = false)
	private String uinNumber;

	@Column(name = "min_age_at_entry", nullable = false)
	private Integer min_AgeAtEntry;

	@Column(name = "max_age_at_entry", nullable = false)
	private Integer max_AgeAtEntry;

	@Column(name = "min_maturity_age", nullable = false)
	private Integer min_MaturityAge;

	@Column(name = "max_maturity_age", nullable = false)
	private Integer max_MaturityAge;

	@Column(name = "min_regular_premium", nullable = false)
	private Integer min_RegularPremium;

	@Column(name = "max_regular_premium", nullable = false)
	private Integer max_RegularPremium;

	@Column(name = "limited_premium_1", nullable = false)
	private Integer limitedPremium1;

	@Column(name = "limited_premium_2", nullable = false)
	private Integer limitedPremium2;

	@Column(name = "limited_premium_3", nullable = false)
	private Integer limitedPremium3;

	@Column(name = "limited_premium_4", nullable = false)
	private Integer limitedPremium4;

	@Column(name = "launch_date", nullable = false)
	private LocalDateTime launchDate;

	@Column(name = "min_policy_term", nullable = false)
	private Integer min_PolicyTerm;

	@Column(name = "max_policy_term", nullable = false)
	private Integer max_PolicyTerm;

	@Column(name = "min_installment_premium_yearly", nullable = false)
	private Integer min_InstallmentPremiumYearly;

	@Column(name = "max_installment_premium_yearly", nullable = false)
	private Integer max_InstallmentPremiumYearly;

	@Column(name = "min_installment_premium_half_yearly", nullable = false)
	private Integer min_InstallmentPremiumHalfYearly;

	@Column(name = "max_installment_premium_half_yearly", nullable = false)
	private Integer max_InstallmentPremiumHalfYearly;

	@Column(name = "min_installment_premium_quarterly", nullable = false)
	private Integer min_InstallmentPremiumQuarterly;

	@Column(name = "max_installment_premium_quarterly", nullable = false)
	private Integer max_InstallmentPremiumQuarterly;

	@Column(name = "min_installment_premium_monthly", nullable = false)
	private Integer min_InstallmentPremiumMonthly;

	@Column(name = "max_installment_premium_monthly", nullable = false)
	private Integer max_InstallmentPremiumMonthly;

	@Column(name = "min_single_premium_amount", nullable = false)
	private Integer min_SinglePremiumAmount;

	@Column(name = "max_single_premium_amount", nullable = false)
	private Integer max_SinglePremiumAmount;

	@Column(name = "min_annuity_purchase_price", nullable = false)
	private Integer min_AnnuityPurchasePrice;

	@Column(name = "max_annuity_purchase_price", nullable = false)
	private Integer max_AnnuityPurchasePrice;

	@Column(name = "min_sum_assured", nullable = false)
	private Integer min_SumAssured;

	@Column(name = "max_sum_assured", nullable = false)
	private Integer max_SumAssured;

	@Column(name = "exit_date", nullable = false)
	private LocalDateTime exitDate;

	@Column(name = "cheque_clearance", length = 100, nullable = false)
	private String chequeClearance;

	@Column(name = "clawback", length = 100, nullable = false)
	private String clawback;

	@Column(name = "bonus_commission_eligibility", length = 100, nullable = false)
	private String bonusCommissionEligibility;

	@Column(name = "bonus_commission_percentage", precision = 10, scale = 2, nullable = false)
	private BigDecimal bonusCommissionPercentage;

	@Column(name = "created_by", nullable = false)
	private Integer createdBy;

	@Column(name = "modified_by", nullable = false)
	private Integer modifiedBy;

	@Column(name = "created_at", updatable = false)
	private LocalDateTime createdAt;

	@Column(name = "updated_at")
	private LocalDateTime updatedAt;

	@Column(name = "approval_status")
	private String approval_status;

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

	//@JsonIgnore
	@JsonManagedReference
	@OneToMany(mappedBy = "products", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
	private List<ProductsData> productsDataList = new ArrayList<>();

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

	public Integer getMin_AgeAtEntry() {
		return min_AgeAtEntry;
	}

	public void setMin_AgeAtEntry(Integer min_AgeAtEntry) {
		this.min_AgeAtEntry = min_AgeAtEntry;
	}

	public Integer getMax_AgeAtEntry() {
		return max_AgeAtEntry;
	}

	public void setMax_AgeAtEntry(Integer max_AgeAtEntry) {
		this.max_AgeAtEntry = max_AgeAtEntry;
	}

	public Integer getMin_MaturityAge() {
		return min_MaturityAge;
	}

	public void setMin_MaturityAge(Integer min_MaturityAge) {
		this.min_MaturityAge = min_MaturityAge;
	}

	public Integer getMax_MaturityAge() {
		return max_MaturityAge;
	}

	public void setMax_MaturityAge(Integer max_MaturityAge) {
		this.max_MaturityAge = max_MaturityAge;
	}

	public Integer getMin_RegularPremium() {
		return min_RegularPremium;
	}

	public void setMin_RegularPremium(Integer min_RegularPremium) {
		this.min_RegularPremium = min_RegularPremium;
	}

	public Integer getMax_RegularPremium() {
		return max_RegularPremium;
	}

	public void setMax_RegularPremium(Integer max_RegularPremium) {
		this.max_RegularPremium = max_RegularPremium;
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

	public Integer getMin_PolicyTerm() {
		return min_PolicyTerm;
	}

	public void setMin_PolicyTerm(Integer min_PolicyTerm) {
		this.min_PolicyTerm = min_PolicyTerm;
	}

	public Integer getMax_PolicyTerm() {
		return max_PolicyTerm;
	}

	public void setMax_PolicyTerm(Integer max_PolicyTerm) {
		this.max_PolicyTerm = max_PolicyTerm;
	}

	public Integer getMin_InstallmentPremiumYearly() {
		return min_InstallmentPremiumYearly;
	}

	public void setMin_InstallmentPremiumYearly(Integer min_InstallmentPremiumYearly) {
		this.min_InstallmentPremiumYearly = min_InstallmentPremiumYearly;
	}

	public Integer getMax_InstallmentPremiumYearly() {
		return max_InstallmentPremiumYearly;
	}

	public void setMax_InstallmentPremiumYearly(Integer max_InstallmentPremiumYearly) {
		this.max_InstallmentPremiumYearly = max_InstallmentPremiumYearly;
	}

	public Integer getMin_InstallmentPremiumHalfYearly() {
		return min_InstallmentPremiumHalfYearly;
	}

	public void setMin_InstallmentPremiumHalfYearly(Integer min_InstallmentPremiumHalfYearly) {
		this.min_InstallmentPremiumHalfYearly = min_InstallmentPremiumHalfYearly;
	}

	public Integer getMax_InstallmentPremiumHalfYearly() {
		return max_InstallmentPremiumHalfYearly;
	}

	public void setMax_InstallmentPremiumHalfYearly(Integer max_InstallmentPremiumHalfYearly) {
		this.max_InstallmentPremiumHalfYearly = max_InstallmentPremiumHalfYearly;
	}

	public Integer getMin_InstallmentPremiumQuarterly() {
		return min_InstallmentPremiumQuarterly;
	}

	public void setMin_InstallmentPremiumQuarterly(Integer min_InstallmentPremiumQuarterly) {
		this.min_InstallmentPremiumQuarterly = min_InstallmentPremiumQuarterly;
	}

	public Integer getMax_InstallmentPremiumQuarterly() {
		return max_InstallmentPremiumQuarterly;
	}

	public void setMax_InstallmentPremiumQuarterly(Integer max_InstallmentPremiumQuarterly) {
		this.max_InstallmentPremiumQuarterly = max_InstallmentPremiumQuarterly;
	}

	public Integer getMin_InstallmentPremiumMonthly() {
		return min_InstallmentPremiumMonthly;
	}

	public void setMin_InstallmentPremiumMonthly(Integer min_InstallmentPremiumMonthly) {
		this.min_InstallmentPremiumMonthly = min_InstallmentPremiumMonthly;
	}

	public Integer getMax_InstallmentPremiumMonthly() {
		return max_InstallmentPremiumMonthly;
	}

	public void setMax_InstallmentPremiumMonthly(Integer max_InstallmentPremiumMonthly) {
		this.max_InstallmentPremiumMonthly = max_InstallmentPremiumMonthly;
	}

	public Integer getMin_SinglePremiumAmount() {
		return min_SinglePremiumAmount;
	}

	public void setMin_SinglePremiumAmount(Integer min_SinglePremiumAmount) {
		this.min_SinglePremiumAmount = min_SinglePremiumAmount;
	}

	public Integer getMax_SinglePremiumAmount() {
		return max_SinglePremiumAmount;
	}

	public void setMax_SinglePremiumAmount(Integer max_SinglePremiumAmount) {
		this.max_SinglePremiumAmount = max_SinglePremiumAmount;
	}

	public Integer getMin_AnnuityPurchasePrice() {
		return min_AnnuityPurchasePrice;
	}

	public void setMin_AnnuityPurchasePrice(Integer min_AnnuityPurchasePrice) {
		this.min_AnnuityPurchasePrice = min_AnnuityPurchasePrice;
	}

	public Integer getMax_AnnuityPurchasePrice() {
		return max_AnnuityPurchasePrice;
	}

	public void setMax_AnnuityPurchasePrice(Integer max_AnnuityPurchasePrice) {
		this.max_AnnuityPurchasePrice = max_AnnuityPurchasePrice;
	}

	public Integer getMin_SumAssured() {
		return min_SumAssured;
	}

	public void setMin_SumAssured(Integer min_SumAssured) {
		this.min_SumAssured = min_SumAssured;
	}

	public Integer getMax_SumAssured() {
		return max_SumAssured;
	}

	public void setMax_SumAssured(Integer max_SumAssured) {
		this.max_SumAssured = max_SumAssured;
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

	public List<ProductsData> getProductsDataList() {
		return productsDataList;
	}

	public void setProductsDataList(List<ProductsData> productsDataList) {
		this.productsDataList = productsDataList;
	}

}
