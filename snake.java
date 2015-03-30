import java.awt.Color;
import java.util.List;

import lab10.Cell;
import sedgewick.StdDraw;

public class Snake 
{

	List<Cell> available;
	int cols;
	int rows;
	Snake next;

	public Snake (int cols, int rows, Snake next) 
	{
		this.cols = cols;
		this.rows = rows;
		this.next = next;
	}
	public static void main(String[] args) 
	{
		boolean lost = false;
		int killCount=0;
		int moveCount=0;
		int score=0;

		while (true)
		{
			Snake viper = new Snake(13,13,new Snake(12,13,new Snake(11,13,new Snake(10,13,new Snake(9,13,null)))));
			boolean direction= false;
			char direct ='d';
			int length=5;
			int mouseCol= 0;
			int mouseR= 0;

			StdDraw.setXscale(0,25);
			StdDraw.setYscale(0,25);
			boolean isEaten=true;

			if (StdDraw.hasNextKeyTyped()==true)
			{
				if ( StdDraw.nextKeyTyped()==' ')
				{ 
					lost= false;
				}
			}

			if(lost==true)
			{
				StdDraw.filledRectangle(3, 19, 2, .5);
				StdDraw.filledRectangle(1, 16.25, .5, 2.75);
				StdDraw.filledRectangle(3, 13.5, 2, .5);
				StdDraw.filledRectangle(5, 14.875, .5, 1.325);
				StdDraw.filledRectangle(4, 16.25, 1, .5);
				
				StdDraw.filledRectangle(7,16.25,.5,2.75);
				StdDraw.filledRectangle(11,16.25,.5,2.75);
				StdDraw.filledRectangle(9, 19, 2, .5);
				StdDraw.filledRectangle(9, 16.25, 2, .5);
				
				StdDraw.filledRectangle(13, 16.25, .5, 2.75);
				StdDraw.filledRectangle(15.5, 16.25, .5, 2.75);
				StdDraw.filledRectangle(18, 16.25, .5, 2.75);
				StdDraw.filledRectangle(14.125, 19, 1.125, .5);
				StdDraw.filledRectangle(16.875, 19, 1.125, .5);
				
				StdDraw.filledRectangle(20, 16.25, .5, 2.75);
				StdDraw.filledRectangle(22, 16.25, 2, .5);
				StdDraw.filledRectangle(22, 13.5, 2, .5);
				StdDraw.filledRectangle(22, 19, 2, .5);
				
				StdDraw.filledRectangle(13, 8.25, .5, 2.75);
				StdDraw.filledRectangle(15, 8.25, 2, .5);
				StdDraw.filledRectangle(15, 5.5, 2, .5);
				StdDraw.filledRectangle(15, 11, 2, .5);
				
				StdDraw.filledRectangle(3, 11, 2, .5);
				StdDraw.filledRectangle(1, 8.25, .5, 2.75);
				StdDraw.filledRectangle(3, 5.5, 2, .5);
				StdDraw.filledRectangle(5, 8.25, .5, 2.75);
				
				StdDraw.filledRectangle(7, 8.25,.5,2.75);
				StdDraw.filledRectangle(11, 8.25,.5,2.75);
				StdDraw.filledRectangle(9, 5.5, 1.75, .5);
				
				StdDraw.filledRectangle(18.75, 8.25,.5,2.75);
				StdDraw.filledRectangle(22.75, 9.625,.5,1.375);
				StdDraw.filledRectangle(20.75, 11, 2, .5);
				StdDraw.filledRectangle(20.75, 8.25, 2, .5);
				StdDraw.filledRectangle(22.75, 6.65,.5,1.125);
				
				StdDraw.setPenColor(StdDraw.BLACK);
				StdDraw.text(2, 25, "New Game?");
				StdDraw.text(2, 24, "Press Space");
				StdDraw.text(1,0,"Kills:"+killCount);
				StdDraw.text(23,0,"Score: "+score);
			}

			StdDraw.show(250);
			StdDraw.clear();
			while (lost == false) 
			{
				moveCount++;
				if(moveCount%5==0)
				{
					score--;
				}
				StdDraw.setPenColor(StdDraw.RED);
				StdDraw.text(1,0,"Kills:"+killCount);
				StdDraw.text(23,0,"Score:"+score);
				direction=StdDraw.hasNextKeyTyped();	
				boolean mousePos= false;
				if (isEaten==true || moveCount%37==0)
				{
					moveCount=0;
					while(mousePos == false)
					{
						mousePos=true;
						mouseCol= (int) (Math.random()*25);
						mouseR= (int) (Math.random()*25);

						for (Snake cobra= viper; cobra.next != null; cobra=cobra.next)
						{

							if (cobra.cols == mouseCol && cobra.rows == mouseR) 
							{ 
								mousePos= false;
							}
						}
						isEaten=false;
					}
				}

				if (direction== true)
				{
					direct= StdDraw.nextKeyTyped();
				}
				for (Snake cobra= viper.next; cobra.next != null; cobra=cobra.next)
				{
					if (cobra.cols == viper.cols && cobra.rows == viper.rows)
					{
						lost = true;
						killCount++;
						break;
					}

				}
				if (viper.cols >25 || viper.cols <0 || viper.rows >25 || viper.rows <0) 
				{
					killCount++;
					lost=true;
				}
				if (lost== true) 
				{
					break;
				}
				if (direct== 'w' || direct == 'W')
				{
					viper= new Snake (viper.cols, viper.rows +1, viper);
					StdDraw.line(25, 25, 25, 24);
					StdDraw.line(24.75, 24.75, 25, 25);
					StdDraw.line(25.25, 24.75, 25, 25);
				}
				if (direct== 's' || direct == 'S')
				{
					viper= new Snake (viper.cols, viper.rows -1, viper);
					StdDraw.line(25, 25, 25, 24);
					StdDraw.line(25.25, 24.25, 25, 24);
					StdDraw.line(24.7, 24.25, 25, 24);
				}
				if (direct== 'a' || direct == 'A')
				{
					StdDraw.line(25, 25, 24, 25);
					StdDraw.line(24.25, 25.25, 24, 25);
					StdDraw.line(24.25, 24.70, 24, 25);
					viper= new Snake (viper.cols -1, viper.rows, viper);
				}
				if (direct== 'd' || direct == 'D')
				{
					StdDraw.line(25, 25, 24, 25);
					StdDraw.line(24.75, 25.25, 25, 25);
					StdDraw.line(24.75, 24.70, 25, 25);
					viper= new Snake (viper.cols +1 , viper.rows , viper);
				}
				if (viper.cols == mouseCol && viper.rows== mouseR) 
				{
					length= length +3;
					isEaten=true;
					score+=10;
				}

				int sLength= 0;
				for (Snake cobra= viper; cobra.next != null; cobra=cobra.next)
				{
					sLength++;
				}
				if (sLength> length)
				{
					Snake python= new Snake(viper.cols, viper.rows, null);
					Snake solid = python;
					for (Snake cobra= viper.next; cobra.next != null; cobra=cobra.next)
					{
						python.next= new Snake (cobra.cols,cobra.rows, null);
						python=python.next;
					}
					viper=solid;
				}

				StdDraw.setPenColor(Color.BLACK);
				for (Snake cobra= viper; cobra.next != null; cobra=cobra.next)
				{
					StdDraw.filledRectangle(cobra.cols, cobra.rows, .5, .5);

				}

				StdDraw.setPenColor(Color.GREEN);
				StdDraw.filledCircle(mouseCol, mouseR, .5);

				if (length< 17)
				{
					StdDraw.show(250);
				}
				if (length <35  && length >= 17)
				{
					StdDraw.show(150);
				}
				if (length <50  && length >= 35)
				{
					StdDraw.show(125);
				}
				if (length <550  && length >= 50)
				{
					StdDraw.show(100);
				}
				if ( length >= 550) 
				{
					StdDraw.show(30);
				}

				StdDraw.clear();
			}
		}
	}
}