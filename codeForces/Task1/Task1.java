import java.util.ArrayList;
import java.util.Collections;
import java.util.Scanner;

// https://codeforces.com/problemset/problem/1296/D
public class Task1 {
	public static void main(String[] args) {
		Scanner input = new Scanner(System.in);

		int n = input.nextInt(); // количество монстров
		double a = input.nextInt(); // моя сила удара
		double b = input.nextInt(); // сила удара соперника
		int k = input.nextInt(); // количество возможных использований секретной техники

		double sumDamage = a + b; // общая сила удара
		ArrayList<Integer> monsters = new ArrayList<Integer>(); // массив для монстров, которых не победили(дальше поподробнее)
		int countWin = 0; // количество возможных выигрышных партий, очков

		for (int i = 1; i <= n; i += 1) {
			double monster = input.nextInt(); // очередной монстр

			double remainingDamage = monster % sumDamage; // остаток урона после серии ударов
			// remainingDamage = по сути ищем сколько останется хп перед итоговым боем 
			// или победил ли его наш соперник. Далее станет яснее
			
			// последний удар сделали не мы, поэтому этот случай можно обработать
			// для этого откатимся на 1 пару ходов. А потом будем использовать технику.
			if (remainingDamage == 0) {
				// количество проведенных секретных техник понадобится 
				// (на основе оставшегося hp у монстра при откате на 1 пару ходов):
				int amountOfSecretTechnology = (int) Math.ceil(b / a);
				monsters.add(amountOfSecretTechnology);
				continue;
			}
			
			
			if (remainingDamage <= a) { // проверяем сможем ли именно МЫ его "добить" c 1 удара
				countWin += 1; // прибавляем очко за победу
				continue;
			}

		
			/* в данном случае количество необходимых проведенных техник вычисляется несколько иначе
			* учитываем то, что монстр не был добит (remainingDamage). А значит нужно теперь пользоваться техниками
			* чтобы добить первее без отката на шаг назад
			*/
			int amountOfSecretTechnology = (int) Math.ceil((remainingDamage - a) / a); 
			monsters.add(amountOfSecretTechnology);
		}

		Collections.sort(monsters); // сортируем чтобы выбрать первых двух с самым малым количеством
		// использования секретных техник для выигрыша

		int index = 0; // просто счетчик индексов
		int sizeOfMonsters = monsters.size();
		while (k > 0) {
			if (index >= sizeOfMonsters) break;

			// берем слабенького монстра
			int monster = monsters.get(index);
			
			/* если запас техник остался то минусуем и добавляем очко выигрыша
			 * если нет то прекращаем,
			 * так как дальше монстры с еще большим количеством 
			 * необходимых техник для победы и смысла смотреть нет
			*/
			if (k - monster >= 0) {
				k -= monster;
				countWin += 1;
			}
			else break;

			index += 1;
		}

		System.out.println(countWin);
	}
}
