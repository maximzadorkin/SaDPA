import java.util.Scanner;

// https://codeforces.com/problemset/problem/991/C

public class Task4 {
  public static void main(String args[]) {
    long eclairs = new Scanner(System.in).nextLong(); // количество эклеров всего

    /* число k будет распологаться в промежутке 
     * 1 .. eclairs, а это значит
     * что мы можем найти это число быстрее,
     * используя бинарный поиск
    */
		long startPoint = 1;
		long endPoint = eclairs;
		long k = eclairs;
		while(startPoint <= endPoint) {
      long pivot = (startPoint + endPoint) / 2; // выбираем середину нашего отрезка

      // найдем число k для текущей pivot
      long countEclairs = eclairs;
      long sum = 0;
      while(countEclairs > 0) {
        long day = Math.min(pivot, countEclairs); // день
        sum += day; // доля Васи (накапливаем, чтобы узнать сколько он съест всего)
        countEclairs -= day; // доля Васи вычитаем
        countEclairs -= countEclairs / 10; // Петину долю вычитаем
      }

      if (sum * 2 >= eclairs) { // проверяем больше/равно половине от всех эклеров съел Вася или нет
        // если да то pivot теперь новое k
        // а так же сужаем отрезок вдвое
        // и продолжаем идти к минимальному к
        k = pivot;
				endPoint = pivot - 1;
      }
      // к остается прежним, сужаем отрезок и переходим на правую сторону от середины прошлого отрезка
			else startPoint = pivot + 1;
    }

		System.out.println(k);
  }
}