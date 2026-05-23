let chequingBalance = 1000;
let savingsBalance = 2500;

let showDetails = true;

function showHideDetails() {
  showDetails = !showDetails;

  if (showDetails) {
    document.getElementById("account-number").innerText =
      "Account Number: 00102020387929";
    document.getElementById("account-name").innerText =
      "Account Name: Jane Chapco";
    document.getElementById("chequing-balance").innerText = "$1000.00";
    document.getElementById("saving-balance").innerText = "$2500.00";
    document.getElementById("eye-icon").src = "assets/images/hide.png";
  } else {
    document.getElementById("account-number").innerText =
      "Account Number: *****7929";
    document.getElementById("account-name").innerText =
      "Account Name: Jane *****";
    document.getElementById("chequing-balance").innerText = "$****";
    document.getElementById("saving-balance").innerText = "$****";
    document.getElementById("eye-icon").src = "assets/images/show.png";
  }
}

function deposit() {
  const depositType = document.getElementById("deposit-type").value;
  const depositAmount = Number(document.getElementById("deposit-amount").value);
  const depositAccount = document.getElementById("deposit-account").value;
  const depositMemo = document.getElementById("deposit-memo").value;

  if (depositAccount === "chequing") {
    chequingBalance += depositAmount;
  } else {
    savingsBalance += depositAmount;
  }
  updateBalances();

  document.getElementById("deposit-form").reset();
  document.getElementById("deposit-alert").style.display = "block";

  setTimeout(() => {
    document.getElementById("deposit-alert").style.display = "none";
  }, 10000);

  addDepositToHistory(depositType, depositAmount, depositAccount, depositMemo);
}

function transfer() {
  const beneficiaryAccountNumber = document.getElementById(
    "beneficiary-account-number",
  ).value;
  const beneficiaryName = document.getElementById("beneficiary-name").value;
  const transferType = document.getElementById("transfer-type").value;
  const transferAmount = Number(
    document.getElementById("transfer-amount").value,
  );
  const transferAccount = document.getElementById("transfer-account").value;
  const transferMemo = document.getElementById("transfer-memo").value;

  if (transferAccount === "chequing") {
    chequingBalance -= transferAmount;
  } else {
    savingsBalance -= transferAmount;
  }
  updateBalances();

  document.getElementById("transfer-form").reset();
  document.getElementById("transfer-alert").style.display = "block";

  setTimeout(() => {
    document.getElementById("transfer-alert").style.display = "none";
  }, 10000);

  addTransferToHistory(
    beneficiaryAccountNumber,
    beneficiaryName,
    transferType,
    transferAmount,
    transferAccount,
    transferMemo,
  );
}

function updateBalances() {
  document.getElementById("chequing-balance").innerText =
    `$${chequingBalance.toFixed(2)}`;

  document.getElementById("savings-balance").innerText =
    `$${savingsBalance.toFixed(2)}`;
}

updateBalances();

const parent = document.getElementById("transaction-list");

function addDepositToHistory(
  depositType,
  depositAmount,
  depositAccount,
  depositMemo,
) {
  const parent = document.getElementById("transaction-list");

  const recordLi = document.createElement("li");
  recordLi.classList.add(
    "list-group-item",
    "d-flex",
    "justify-content-between",
    "align-items-start",
  );

  const leftSectionDiv = document.createElement("div");
  leftSectionDiv.classList.add("ms-2", "me-auto");

  const titleDiv = document.createElement("div");
  titleDiv.classList.add("fs-5", "fw-bold");
  titleDiv.innerText = `${depositType} Deposit`;

  const detailsDiv = document.createElement("div");
  detailsDiv.classList.add("text-muted");
  detailsDiv.innerText = `To: ${depositAccount} account`;

  const memoDiv = document.createElement("div");
  memoDiv.classList.add("text-muted");
  memoDiv.innerText = `Memo: ${depositMemo}`;

  const timeDiv = document.createElement("div");
  timeDiv.classList.add("text-muted");
  timeDiv.innerText = `Time: ${new Date().toLocaleString()}`;

  leftSectionDiv.append(titleDiv, detailsDiv, memoDiv, timeDiv);

  const rightSectionDiv = document.createElement("div");
  rightSectionDiv.classList.add("text-end");

  const amountDiv = document.createElement("div");
  amountDiv.classList.add("fs-5", "fw-bold", "text-success");
  amountDiv.innerText = `+$${depositAmount.toFixed(2)}`;

  const balanceDiv = document.createElement("div");
  balanceDiv.classList.add("text-muted");

  if (depositAccount === "chequing") {
    balanceDiv.innerText = `Balance: $${chequingBalance.toFixed(2)}`;
  } else {
    balanceDiv.innerText = `Balance: $${savingsBalance.toFixed(2)}`;
  }

  rightSectionDiv.append(amountDiv, balanceDiv);
  recordLi.append(leftSectionDiv, rightSectionDiv);

  parent.prepend(recordLi);
}

function addTransferToHistory(
  beneficiaryAccountNumber,
  beneficiaryName,
  transferType,
  transferAmount,
  transferAccount,
  transferMemo,
) {
  const parent = document.getElementById("transaction-list");

  const recordLi = document.createElement("li");
  recordLi.classList.add(
    "list-group-item",
    "d-flex",
    "justify-content-between",
    "align-items-start",
  );

  const leftSectionDiv = document.createElement("div");
  leftSectionDiv.classList.add("ms-2", "me-auto");

  const titleDiv = document.createElement("div");
  titleDiv.classList.add("fs-5", "fw-bold");
  titleDiv.innerText = `${transferType} Transfer`;

  const detailsDiv = document.createElement("div");
  detailsDiv.classList.add("text-muted");

  const last2Digits = beneficiaryAccountNumber.slice(-2);

  detailsDiv.innerText = `From: ${transferAccount} account | To: ${beneficiaryName} (Account: XXX${last2Digits})`;

  const memoDiv = document.createElement("div");
  memoDiv.classList.add("text-muted");
  memoDiv.innerText = `Memo: ${transferMemo}`;

  const timeDiv = document.createElement("div");
  timeDiv.classList.add("text-muted");
  timeDiv.innerText = `Time: ${new Date().toLocaleString()}`;

  leftSectionDiv.append(titleDiv, detailsDiv, memoDiv, timeDiv);

  const rightSectionDiv = document.createElement("div");
  rightSectionDiv.classList.add("text-end");

  const amountDiv = document.createElement("div");
  amountDiv.classList.add("fs-5", "fw-bold", "text-danger");
  amountDiv.innerText = `-$${transferAmount.toFixed(2)}`;

  const balanceDiv = document.createElement("div");
  balanceDiv.classList.add("text-muted");

  if (transferAccount === "chequing") {
    balanceDiv.innerText = `Balance: $${chequingBalance.toFixed(2)}`;
  } else {
    balanceDiv.innerText = `Balance: $${savingsBalance.toFixed(2)}`;
  }

  rightSectionDiv.append(amountDiv, balanceDiv);
  recordLi.append(leftSectionDiv, rightSectionDiv);

  parent.prepend(recordLi);
}
