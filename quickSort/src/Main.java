import java.util.Scanner;
import java.util.Random;
import java.util.Arrays;
public class Main {

    public static void main(String args[]) {

        Scanner input = new Scanner(System.in);

        System.out.print("Генерировать матрицу или массив?");
        System.out.print("(матрица - mat, массив - mas): ");
        String choise = input.nextLine();
        if (choise == "mat") {

            int[] array = array(n); //сгенерировали массив

        } else if (choise == "mas") {



        } else return;

        System.out.print("Введите ширину/длину матрицы: ");
        System.out.print("Выводить итоговую матрицу/массив?");
        int n = input.nextInt();




        int[][] array = array(n); //сгенерировали массив

        MultySort srt = new MultySort();
        srt.SlellSortMatrix(array, n, true);
        srt.QuickSortMatrix(array, n, true);
        srt.standartSortMatrix(array, n, true);

    }
    //генерация массива
    public static int[] array(int n) {

        Scanner input = new Scanner(System.in);
        Random rnd = new Random();

        System.out.print("Генерация массива: \n");
        int[][] array = new int[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j<n; j++) {
                array[i][j] = rnd.nextInt(100);
                System.out.print(array[i][j] + "\t");
            }
            System.out.print("\n");
        }
        return array;

    }

}
