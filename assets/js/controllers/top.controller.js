angular
  .module('walletApp')
  .controller('TopCtrl', TopCtrl);

function TopCtrl ($scope, $filter, Wallet, currency, browser, Ethereum, assetContext, MyBlockchainApi, Env, languages) {
  let isUsingRequestQuickCopyExperiment = MyBlockchainApi.createExperiment(1);

  Env.then(env => {
    if (env.webHardFork.balanceMessage) {
      $scope.balanceMessage = languages.localizeMessage(env.webHardFork.balanceMessage);
    }
  });

  $scope.copied = false;
  $scope.status = Wallet.status;
  $scope.settings = Wallet.settings;
  $scope.isBitCurrency = currency.isBitCurrency;

  $scope.browser = browser;

  $scope.toggleDisplayCurrency = () => Wallet.toggleDisplayCurrency();

  $scope.getTotal = () => Wallet.total();
  $scope.getEthTotal = () => Ethereum.balance;

  $scope.showBtcClipboard = () => assetContext.getContext().defaultTo === 'btc';

  $scope.resetCopy = () => $scope.copied = false;

  $scope.nextAddress = () => {
    if ($scope.copied) return;
    $scope.copied = true;
    isUsingRequestQuickCopyExperiment.recordB();
    let defaultIdx = Wallet.my.wallet.hdwallet.defaultAccountIndex;
    return Wallet.getReceivingAddressForAccount(defaultIdx);
  };
}
