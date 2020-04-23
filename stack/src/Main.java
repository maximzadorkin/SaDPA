import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

public class Main {
    public static void main(String args[]) throws IOException {
        // чтение файла
        String fileName = "C:\\Users\\Maxim\\Desktop\\Университет\\СиАОД\\Лабораторная 4\\test.txt";
        String contents = readUsingFiles(fileName);
        System.out.println(contents);

        //обозначаем что есть цифры, что есть буквы
        String figures = "0123456789";
        String letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        letters += "абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";

        // прогон по файлу и запись в стеки
        int maxSize = contents.length();
        Stack number = new Stack(maxSize);
        Stack text = new Stack(maxSize);
        Stack symbols = new Stack(maxSize);

        for (int i = 0; i < contents.length(); i += 1) {
            String symb = contents.substring(i, i + 1);
            if (letters.contains(symb)) {
                text.push(symb);
                continue;
            }
            if (figures.contains(symb)) {
                number.push(symb);
                continue;
            }
            symbols.push(symb);
        }

        //ревёрс и вывод стеков
        System.out.print("Вывод стека цифр: ");
        Stack numberReverse = new Stack(maxSize);
        while (!number.isEmpty())
            numberReverse.push(number.pop());
        while (!numberReverse.isEmpty())
            System.out.print(numberReverse.pop());

        System.out.print("\nВывод стека букв: ");
        Stack textReverse = new Stack(maxSize);
        while (!text.isEmpty())
            textReverse.push(text.pop());
        while (!textReverse.isEmpty())
            System.out.print(textReverse.pop());


        System.out.print("\nВывод стека остальных символов: ");
        Stack symbolsReverse = new Stack(maxSize);
        while (!symbols.isEmpty())
            symbolsReverse.push(symbols.pop());
        while (!symbolsReverse.isEmpty())
            System.out.print(symbolsReverse.pop());
    }
    private static String readUsingFiles(String fileName) throws IOException {
        return new String(Files.readAllBytes(Paths.get(fileName)));
    }
}
