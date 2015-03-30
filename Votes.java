package combo;

import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

public class Combo<T> implements ComboIsh {

	final private Object[] contents;
	final private ComboIsh rest;
	static int max =0;

	public Combo(Collection<T> list, ComboIsh rest) {
		this.contents = list.toArray();
		this.rest = rest;
	}

	/**
	 * 
	 * Factory methods
	 * 
	 */

	public static<T> ComboIsh genCombo(Collection<T> list) {
		return new Single<T>(list);
	}

	public static<T> ComboIsh genCombo(Collection<T> list, ComboIsh c) {
		return new Combo<T>(list, c);
	}

	@Override
	public Iterator<Object[]> iterator() {
		return new Iterator<Object[]>() {

			private int count = 0;
			private Iterator<Object[]> r = rest.iterator();
			private Object[] currRest = r.next();
			private boolean hasMore = true;

			@Override
			public boolean hasNext() {
				return hasMore;
			}

			@Override
			public Object[] next() {

				Object mine     = contents[count];
				Object[] theirs = currRest;
				Object[] ans =  makeAnswer(mine, theirs);

				if (++count < contents.length) {
					// all good
				}
				else if (r.hasNext()) {
					count = 0;
					currRest = r.next();
				}
				else {
					hasMore = false;
				}

				return ans;
			}

			@Override
			public void remove() {
				throw new UnsupportedOperationException();

			}

			private Object[] makeAnswer(Object first, Object[] rest) {
				Object[] ans = new Object[rest.length+1];
				ans[0] = first;
				for (int i=1; i < ans.length; ++i) {
					ans[i] = rest[i-1];
				}
				return ans;
			}

		};
	}

	//
	// Generate the set { 0, 1, ..., num-1 }
	//
	private static Set<Integer> genSetInts(int num) {
		Set<Integer> ans = new HashSet<Integer>();
		for (int i=0; i < num; ++i) {
			ans.add(new Integer(i));
		}
		return ans;
	}

	//
	// Generate a list of characters starting with a
	//
	private static List<Object> genListChars(int num) {
		List<Object> ans = new LinkedList<Object>();
		for (int i=0; i < num; ++i) {
			char c = (char) (i+'a');
			ans.add(c);
		}
		return ans;
	}

	/**
	 * Demonstrate this class
	 * @param args
	 */
	public static void main(String[] args) {
		// 
		// Start with [ a, b, c, d ]
		ComboIsh big = Combo.genCombo(genListChars(10));
		//
		// and cross it 3 times with integers { 0, 1, ..., 7 }
		//
		Set<Integer> ints = genSetInts(3);
		for (int i=0; i < 3; ++i) {
			big = Combo.genCombo(ints, big);
		}

		//
		// print the result
		//
		int [][] prefs= new int[270][3]; //270 was hard coded. Modify if inputs have been changed
		int counter=0;
		for (Object[] o : big) {
			prefs[counter][0] = Character.getNumericValue(Arrays.toString(o).charAt(1));
			prefs[counter][1] = Character.getNumericValue(Arrays.toString(o).charAt(4));
			prefs[counter][2] = Character.getNumericValue(Arrays.toString(o).charAt(7));
			counter++; //counts 270
		}

		int [][] validPrefs = new int[60][3];
		counter=0;
		for(int i=0;i<270;i++){	//print loop
			if(prefs[i][0]!=prefs[i][1] && prefs[i][0]!=prefs[i][2] && prefs[i][1]!=prefs[i][2]){
				validPrefs[counter][0]=prefs[i][0];
				validPrefs[counter][1]=prefs[i][1];
				validPrefs[counter][2]=prefs[i][2];
				counter++; //counts 60
			}
		}

		int [] [] election = new int[10][3];
		int [] countP= new int[3];
		int [] countST= new int[3];
		int [] countB= new int[3];
		int [] calc= new int[3];
		int totals[][] = new int [3][3];
		
		for (int n=0;n<25;n++){ //run the code n number of times

			for(int i=0;i<10;i++){
				counter=6*i;
				counter+= (int)(Math.random()*6);
				election[i][0]=validPrefs[counter][0];
				election[i][1]=validPrefs[counter][1];
				election[i][2]=validPrefs[counter][2];
				if(election[i][0]==0){
					totals[0][0]++;
				}
				if(election[i][0]==1){
					totals[1][0]++;
				}
				if(election[i][0]==2){
					totals[2][0]++;
				}
				if(election[i][1]==0){
					totals[0][1]++;
				}
				if(election[i][1]==1){
					totals[1][1]++;
				}
				if(election[i][1]==2){
					totals[2][1]++;
				}
				if(election[i][2]==0){
					totals[0][2]++;
				}
				if(election[i][2]==1){
					totals[1][2]++;
				}
				if(election[i][2]==2){
					totals[2][2]++;
				}
				System.out.println((char)('a'+i)+" [ "+election[i][0]+" , "+election[i][1]+" , "+election[i][2]+" ]");
			}
			int [][]bTotals= totals;

			//plurality election
			calc[0]=totals[0][0];calc[1]=totals[1][0];calc[2]=totals[2][0];
			int winner = calcWinner(calc,-1);
			countP[winner]++;

			//borda 
			int zeroPoints=bTotals[0][0]*3+bTotals[0][1]*2+bTotals[0][2]*1;
			int onePoints=bTotals[1][0]*3+bTotals[1][1]*2+bTotals[1][2]*1;
			int twoPoints=bTotals[2][0]*3+bTotals[2][1]*2+bTotals[2][2]*1;
			
			calc[0]=zeroPoints;calc[1]=onePoints;calc[2]=twoPoints;
			winner = calcWinner(calc,-1);
			countB[winner]++;
			
			//single transferable election
			int minVotes=99;
			calc[0]=totals[0][0];calc[1]=totals[1][0];calc[2]=totals[2][0];
			int loser=calcLoser(calc,99);
			while(max<6){	//determine loser
				loser=calcLoser(calc,99);

				//transfer votes of anyone who voted to the loser
				for(int i=0;i<10;i++){
					if(election[i][0]==loser){
						totals[loser][0]--;
						totals[election[i][1]][0]++;
					}
				}

				//recalculate winner
				calc[0]=totals[0][0];calc[1]=totals[1][0];calc[2]=totals[2][0];
				winner = calcWinner(calc,-1);

			
			}
			countST[winner]++;
			
		}
		System.out.println();
		System.out.println("0 wins "+countP[0]+" times by plurality, "+countST[0]+" times by ST, "+countB[0]+" times by borda");
		System.out.println("1 wins "+countP[1]+" times by plurality, "+countST[1]+" times by ST, "+countB[1]+" times by borda");
		System.out.println("2 wins "+countP[2]+" times by plurality, "+countST[2]+" times by ST, "+countB[2]+" times by borda");

	}
	
	public static int calcWinner(int []totals, int maxVotes){
		int winner=-1;
		for(int i=0;i<3;i++){
			maxVotes=Math.max(maxVotes,totals[i]);
			if(maxVotes==totals[i]){
				winner=i;
			}
		}
		if(maxVotes==totals[0] && maxVotes==totals[1]){//tie between 0 and 1
			winner=(Math.random()>0.5) ? 0 : 1;
		}
		if(maxVotes==totals[0] && maxVotes==totals[2]){//tie between 0 and 2
			winner=(Math.random()>0.5) ? 0 : 2;
		}
		if(maxVotes==totals[1] && maxVotes==totals[2]){//tie between 1 and 2
			winner=(Math.random()>0.5) ? 1 : 2;
		}
		max=maxVotes;
		return winner;
	}
	
	public static int calcLoser(int []totals, int minVotes){
		int loser=-1;
		for(int i=0;i<3;i++){
			minVotes=Math.min(minVotes,totals[i]);
			if(minVotes==totals[i]){
				loser=i;
			}
		}
		if(minVotes==totals[0] && minVotes==totals[1]){//tie between 0 and 1
			loser=(Math.random()>0.5) ? 0 : 1;
		}
		if(minVotes==totals[0] && minVotes==totals[2]){//tie between 0 and 2
			loser=(Math.random()>0.5) ? 0 : 2;
		}
		if(minVotes==totals[1] && minVotes==totals[2]){//tie between 1 and 2
			loser=(Math.random()>0.5) ? 1 : 2;

		}
		return loser;
	}
}