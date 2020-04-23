public class Stack {
    public int length;
    public String[] stack;
    public int topIndex;

    public Stack(int size) {
        length = size;
        topIndex = -1;
        stack = new String[length];
    }
    public boolean isEmpty() {
        if (topIndex == -1) {
            return true;
        }
        return false;
    }
    public void push(String value) {
        topIndex += 1;
        length += 1;
        stack[topIndex] = value;
    }
    public String pop() {
        String forOut = stack[topIndex];
        length -= 1;
        topIndex -= 1;
        return forOut;
    }
}
