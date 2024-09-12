<?php 

class Counter {
    function __construct($count) {
        $this->count = $count;
    }

    function increment($addNumber) {
        $this->count += $addNumber->number;
        echo "<div>" . $this->count . "</div>";
    }

    function decrement() {
        $this->count -=1;
        echo "<div>" . $this->count . "</div>";
    }

    function reset() {
        $this->count = 0;
        echo "<div>{$this->count}</div>";
    }

    function getCount() {
        echo "<div>{$this->count}</div>";
    }
}


class Addnumber {
    function __construct($number) {
        $this->number = $number;
    }
}

$counter = new Counter(1222);
$addNumber = new Addnumber(100);
$addNumber2 = new Addnumber(1500);

$counter->increment($addNumber);
$counter->increment($addNumber2);

$counter->decrement();
$counter->getCount();
$counter->reset();


?>

<?php 

class Counter {
    function __construct($count) {
        $this->count = $count;
    }

    function increment($addNumber) {
        $this->count += $addNumber->number;
        echo "<div>" . $this->count . "</div>";
        return $this; // מחזיר את האובייקט הנוכחי
    }

    function decrement() {
        $this->count -=1;
        echo "<div>" . $this->count . "</div>";
        return $this; // מחזיר את האובייקט הנוכחי
    }

    function reset() {
        $this->count = 0;
        echo "<div>{$this->count}</div>";
        return $this; // מחזיר את האובייקט הנוכחי
    }

    function getCount() {
        echo "<div>{$this->count}</div>";
        return $this; // מחזיר את האובייקט הנוכחי
    }
}

class Addnumber {
    function __construct($number) {
        $this->number = $number;
    }
}

$counter = new Counter(1222);
$addNumber = new Addnumber(100);
$addNumber2 = new Addnumber(1500);

// שימוש בשרשור של קריאות לפונקציות
$counter->increment($addNumber)
        ->increment($addNumber2)
        ->decrement()
        ->getCount()
        ->reset();
?>
