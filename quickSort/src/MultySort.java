import java.util.Arrays;

public class MultySort extends Sort {
    public MultySort() {}
    // сортировка матрицы методом шелл
    public void SlellSortMatrix(int[][] arrayNotSort,int n, boolean disp) {
        int[][] array = Arrays.copyOf(arrayNotSort, arrayNotSort.length);
        System.out.println("\nШелл сортировка");

        long startTime = System.currentTimeMillis();
        for (int i = 0; i < n; i++) {
            ShellSort(array[i], n, false);
        }
        long timeSpent = System.currentTimeMillis() - startTime;

        if (disp) dispMatrix(array, n);
        System.out.println("\nпрограмма выполнялась " + timeSpent + " миллисекунд");
    }
    // сортировка матрицы через quicksort
    public void QuickSortMatrix(int[][] arrayNotSort,int n, boolean disp) {
        int[][] array = Arrays.copyOf(arrayNotSort, arrayNotSort.length);
        System.out.println("\nQuickSort");

        long startTime = System.currentTimeMillis();
        for (int i = 0; i < n; i++) {
            QuickSort(array[i], n, false);
        }
        long timeSpent = System.currentTimeMillis() - startTime;

        if (disp) dispMatrix(array, n);
        System.out.println("\nпрограмма выполнялась " + timeSpent + " миллисекунд");
    }
    public void standartSortMatrix(int[][] arrayNotSort,int n, boolean disp) {
        int[][] array = Arrays.copyOf(arrayNotSort, arrayNotSort.length);
        System.out.println("\nСтандартная сортировка java");

        long startTime = System.currentTimeMillis();
        for (int i=0; i<n; i++) {
            Arrays.sort(array[i]); // стандартная сортировка java с помощью библиотеки Arrays
        }
        long timeSpent = System.currentTimeMillis() - startTime;

        if (disp) dispMatrix(array, n);
        System.out.println("\nпрограмма выполнялась " + timeSpent + " миллисекунд");
    }

    public void dispMatrix(int[][] array, int n) {
        for (int i = 0; i < n; i++) {
            Sort srt = new Sort();
            srt.DisplayArray(array[i], n);
            if (i!=n-1) System.out.print("\n");
        }
    }
}
