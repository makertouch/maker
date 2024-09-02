<?php

class Bank {
    function __construct($balance, $todayDeposit) {
        $this->balance = $balance;
        $this->todayDeposit = $todayDeposit;
    }

    // $deposit is an instance of the Deposit class (new Deposit(50))
    // To call a method within a class, you need to use an instance of that class
    function updateBalance($deposit) {  
        return $this->balance + $deposit->amount;
    }
}

class Deposit {
    function __construct($amount) {
        $this->amount = $amount;
    }
}

$bank = new Bank(1000, 0);
?>
<div> Hello, your balance is <?= $bank->balance ?>$ and you deposited <?= $bank->todayDeposit ?>$ today.</div>

<?php 
$deposit = new Deposit(50);
?>

<div> Thank you for your deposit of <?= $deposit->amount ?>$, now your balance is <?= $bank->updateBalance($deposit) ?>$ </div>
