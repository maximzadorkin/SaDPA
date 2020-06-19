import java.util.Scanner;

// https://codeforces.com/problemset/problem/165/B

public class Task2 {
  public static void main(String[] args) {
    Scanner input = new Scanner(System.in);

    int n = input.nextInt(); // строк нужно написать
    int k = input.nextInt(); // коэффициент уменьшения

    /* число v будет располагаться в пределах 1 .. n 
     * а значит можем воспользоваться бинарным поиском
     * чтобы эффективнее найти нужную цифру
     * для реализации бинарного поиска создадим leftPoint и rightPoint
     * чтобы помечать наши отрезки
     */
    int leftPoint = 1;
    int rightPoint = n;
    int v = n;
    while (rightPoint != leftPoint) {
      boolean badNumber = false; // если с этим v нельзя написать код

      // высчитаем количество строчек кода при нынешней v
      // по указанной в задании формуле
      int countLinesOfCode = 0;
      int iter = v; // итерация
      while (countLinesOfCode < n) {
        if (iter <= 0) badNumber = true;

        countLinesOfCode += iter;
        iter /= k; // сделаем нашу формулу рекурентной
      }

      if (!badNumber) {
        // запишем новый v
        v = rightPoint;
        // сдвинем крайнюю правую точку чтобы попробовать найти в ней
        // этим самым уменьшив отрезок вдвое
        int offset = (rightPoint - leftPoint) / 2;
        rightPoint = leftPoint + offset;
        if (offset < 1) break;
      }
      else {
        /* так как в этой точке не получилось вычислить
         * то не записываем результат
         * и смещаемся на правую часть отрезка такой же длины
        */
        int section = rightPoint + (rightPoint - leftPoint); // смещенный в право отрезок, точнее его правая точка
        leftPoint = rightPoint + 1; // +1 так как это значение уже все равно не подойдет
        rightPoint = leftPoint + (section - leftPoint) / 2; 
        v = rightPoint; // так как rightPoint по сути наша точка pivot
      }
    }

    System.out.println(v);
  }
}