import java.util.*;
import java.io.*;

// https://codeforces.com/problemset/problem/1101/E

public class Task3 {
  public static void main(String[] args) {
    Scanner input = new Scanner(System.in);
    PrintWriter output = new PrintWriter(System.out);

    String request;
    int a, b, x, y, h=0, w=0;
    int n = input.nextInt(); // количество запросов
    for (int i = 0; i < n; i += 1) {
        // получаем очередной запрос
        request = String.valueOf(input.next().charAt(0));
        a = input.nextInt();
        b = input.nextInt();

        /* чтобы не проверять дважды условия (так как мы можем положить купюру двояко)
         * отсортируем входящие параметры
         * так как они не влияют на итоговый результат
        */
        x = Math.min(a, b);
        y = Math.max(a, b);
        if (request.equals("?")) { // запрос вопросительный?
          // проверяем наши параметры
          if(x >= h && y >= w) output.println("YES");
          else output.println("NO");
        }
        else {
          /* чтобы каждый раз не вычислять размеры кошелька
           * будем изменять его размеры при каждом + запросе
           * то есть будем узнать длинны его сторон каждый раз
           * и если в этом запросе сторона больше то изменяем старые размеры
          */
          h = Math.max(h, x);
          w = Math.max(w, y);
        }
    }
    output.flush();
  }
}