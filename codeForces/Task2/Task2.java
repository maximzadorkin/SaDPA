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
    while (leftPoint < rightPoint) {
      int pivot =  leftPoint + (rightPoint - leftPoint) / 2; // v на этой итерации,
      // середина нашего отрезка текущего

      int countLinesOfCode = 0; // высчитаем при данном v количество строк
      int iter = pivot;
      while (iter > 0) {
        countLinesOfCode += iter;
        iter /= k; // сделали формулу рекурентной
      }   

      if (countLinesOfCode >= n) { // проверяем написали ли мы необходимое количество строк кода
        v = pivot; // если написали то ставим новый результат как наименьший
        rightPoint = pivot; // смещаем правую точку отрезка. сужаем вдвое область поиска
      }
      else leftPoint = pivot + 1; // если с этим числом не получилось то перемистимся на правую часть отрезка
      // для это сдвинем левую точку на половину отрезка
    }

    System.out.println(v);
  }
}