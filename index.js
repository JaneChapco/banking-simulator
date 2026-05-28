let chequingBalance = 1000;
let savingsBalance = 2500;

let showDetails = true;

function showHideDetails() {
  showDetails = !showDetails;

  if (showDetails) {
    document.getElementById("account-number").innerText =
      "Account Number: 76584345323423";
    document.getElementById("account-name").innerText =
      "Account Name: Jane Chapco";
    document.getElementById("chequing-balance").innerText =
      `$${chequingBalance.toFixed(2)}`;
    document.getElementById("savings-balance").innerText =
      `$${savingsBalance.toFixed(2)}`;
    document.getElementById("eye-icon").src = "assets/images/hide.png";
  } else {
    document.getElementById("account-number").innerText =
      "Account Number: *****3423";
    document.getElementById("account-name").innerText =
      "Account Name: Jane *****";
    document.getElementById("chequing-balance").innerText = "$****";
    document.getElementById("savings-balance").innerText = "$****";
    document.getElementById("eye-icon").src = "assets/images/show.png";
  }
}

function deposit() {
  const depositType = document.getElementById("deposit-type").value;
  const depositAccount = document.getElementById("deposit-account").value;
  const depositAmount = Number(document.getElementById("deposit-amount").value);
  const depositMemo = document.getElementById("deposit-memo").value;

  //VALIDATION

  if (isNaN(depositAmount) || depositAmount <= 0) {
    alert("Please enter a valid deposit amount.");
    return;
  }

  if (depositAccount === "Chequing") {
    chequingBalance += depositAmount;
  } else {
    savingsBalance += depositAmount;
  }
  updateBalances();

  addDepositToHistory(depositType, depositAccount, depositAmount, depositMemo);

  document.getElementById("deposit-form").reset();

  const depositAlert = document.getElementById("deposit-alert");
  depositAlert.style.display = "block";

  setTimeout(() => {
    depositAlert.style.display = "none";
  }, 3000);
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

  // VALIDATION

  if (beneficiaryName.trim() === "") {
    alert("Please enter a beneficiary name.");
    return;
  }
  if (beneficiaryAccountNumber.trim() === "") {
    alert("Please enter a beneficiary account number.");
    return;
  }

  if (isNaN(transferAmount) || transferAmount <= 0) {
    alert("Please enter a valid transfer amount.");
    return;
  }

  if (transferAccount === "Chequing") {
    chequingBalance -= transferAmount;
  } else {
    savingsBalance -= transferAmount;
  }
  updateBalances();

  addTransferToHistory(
    beneficiaryAccountNumber,
    beneficiaryName,
    transferType,
    transferAmount,
    transferAccount,
    transferMemo,
  );

  document.getElementById("transfer-form").reset();

  const transferAlert = document.getElementById("transfer-alert");
  transferAlert.style.display = "block";

  setTimeout(() => {
    transferAlert.style.display = "none";
  }, 3000);
}

function updateBalances() {
  document.getElementById("chequing-balance").innerText =
    `$${chequingBalance.toFixed(2)}`;

  document.getElementById("savings-balance").innerText =
    `$${savingsBalance.toFixed(2)}`;
}

updateBalances();

function addDepositToHistory(
  depositType,
  depositAccount,
  depositAmount,
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

  leftSectionDiv.append(titleDiv, detailsDiv);

  const timeDiv = document.createElement("div");
  timeDiv.classList.add("text-muted");
  timeDiv.innerText = `Time: ${new Date().toLocaleString()}`;

  if (depositMemo.trim() !== "") {
    const memoDiv = document.createElement("div");
    memoDiv.classList.add("text-muted");
    memoDiv.innerText = `Memo: ${depositMemo}`;

    leftSectionDiv.append(memoDiv);
  }

  leftSectionDiv.append(timeDiv);

  const rightSectionDiv = document.createElement("div");
  rightSectionDiv.classList.add("text-end");

  const amountDiv = document.createElement("div");
  amountDiv.classList.add("fs-5", "fw-bold", "text-success");
  amountDiv.innerText = `+$${depositAmount.toFixed(2)}`;

  const balanceDiv = document.createElement("div");
  balanceDiv.classList.add("text-muted");

  if (depositAccount === "Chequing") {
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

  leftSectionDiv.append(titleDiv, detailsDiv);

  const timeDiv = document.createElement("div");
  timeDiv.classList.add("text-muted");
  timeDiv.innerText = `Time: ${new Date().toLocaleString()}`;

  if (transferMemo.trim() !== "") {
    const memoDiv = document.createElement("div");
    memoDiv.classList.add("text-muted");
    memoDiv.innerText = `Memo: ${transferMemo}`;

    leftSectionDiv.append(memoDiv);
  }

  leftSectionDiv.append(timeDiv);

  const rightSectionDiv = document.createElement("div");
  rightSectionDiv.classList.add("text-end");

  const amountDiv = document.createElement("div");
  amountDiv.classList.add("fs-5", "fw-bold", "text-danger");
  amountDiv.innerText = `-$${transferAmount.toFixed(2)}`;

  const balanceDiv = document.createElement("div");
  balanceDiv.classList.add("text-muted");

  if (transferAccount === "Chequing") {
    balanceDiv.innerText = `Balance: $${chequingBalance.toFixed(2)}`;
  } else {
    balanceDiv.innerText = `Balance: $${savingsBalance.toFixed(2)}`;
  }

  rightSectionDiv.append(amountDiv, balanceDiv);
  recordLi.append(leftSectionDiv, rightSectionDiv);

  parent.prepend(recordLi);
}
