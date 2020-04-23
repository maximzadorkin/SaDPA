import java.util.Arrays;
public class Sort {

    public void Sort() { }

    // Шелл сортировка
    public void ShellSort(int[] array, int n, boolean disp) {
        for (int d = n/2; d >=1 ; d/=2) { // смена шага
            for (int i = 0; i < n ; i++) { // проход каждого элемента с этим шагом
                insertSort(array, i, n, d); // сортируем подгруппу методом вставок
            }
        }
        if (disp) DisplayArray(array, n);
    }
    // сортировка вставками
    private void insertSort(int[] array, int start, int n, int d) {
        for (int i = start+d; i < n; i+=d) { // проходим по правой неотсортированной части
            for (int j = start; j < i; j+=d) { // проходим по левой отсортированной части в поисках места куда вставить новое число
                if (array[i] < array[j]) {
                    int tmp = array[j];
                    array[j] = array[i];
                    for (int k = j+=d; k<=i; k+=d) { // делаем сдвиг всех элементов вправо
                        int m = array[k];
                        array[k] = tmp;
                        tmp = m;
                    }
                    break;
                }
            }
        }
    }



    // quicksort сортировка
    public void QuickSort(int[] array, int n, boolean disp) {
        quickSort(array,0, n-1);
        if (disp) DisplayArray(array, n);
    }
    public static void quickSort(int[] array, int low, int high) {

        if (low >= high) {
            return; //завершить выполнение если уже нечего делить
        }

        // выбрать опорный элемент
        int middle = low + (high - low) / 2;
        int opora = array[middle];

        // разделить на подмассивы, который больше и меньше опорного элемента
        int i = low, j = high;
        while (i <= j) {
            while (array[i] < opora) {
                i++;
            }

            while (array[j] > opora) {
                j--;
            }

            if (i <= j) {//меняем местами
                int temp = array[i];
                array[i] = array[j];
                array[j] = temp;
                i++;
                j--;
            }
        }

        // вызов рекурсии для сортировки левой и правой части
        if (low < j) quickSort(array, low, j);

        if (high > i) quickSort(array, i, high);
    }



    // Показать массив
    public void DisplayArray(int[] array, int n) {
        for (int j=0; j<n; j++) {
            System.out.print(array[j] + "\t");
        }
    }

}

