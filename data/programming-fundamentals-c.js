/* Programming Fundamentals (C) — CS102 */
(function () {
    const questionData = [
        [1, 'C Basics', 'C language was developed by:', ['Bjarne Stroustrup', 'Dennis Ritchie', 'James Gosling', 'Guido van Rossum'], 1, 'Dennis Ritchie developed C at Bell Labs.', 'easy'],
        [1, 'C Basics', 'A C program starts execution from:', ['stdio.h', 'main()', 'printf()', 'return'], 1, 'Execution in C starts from main().', 'easy'],
        [1, 'Program Structure', 'Which is a valid C program skeleton?', ['main() { }', 'int main() { return 0; }', 'void start() { }', 'run() { }'], 1, 'int main() { return 0; } is the standard skeleton.', 'easy'],
        [1, 'Header Files', 'Which header is needed for printf and scanf?', ['math.h', 'conio.h', 'stdio.h', 'string.h'], 2, 'stdio.h contains standard input/output declarations.', 'easy'],
        [1, 'Syntax', 'Every C statement typically ends with:', ['.', ':', ';', ','], 2, 'Semicolon terminates most C statements.', 'easy'],
        [1, 'Output', 'Correct syntax for printing a value of x is:', ['printf(x);', 'printf("%d", x);', 'print("%d",x);', 'cout<<x;'], 1, 'Use format specifier with printf.', 'easy'],
        [1, 'Input', 'Correct syntax to read int a is:', ['scanf("%d", a);', 'scanf("%d",&a);', 'input(a);', 'cin>>a;'], 1, 'scanf needs address using &a.', 'easy'],
        [1, 'main Function', 'Which return value usually indicates successful execution?', ['1', '-1', '0', '10'], 2, 'return 0 means successful termination.', 'easy'],
        [1, 'Comments', 'Single-line comment in C uses:', ['/* comment */', '// comment', '# comment', '<!-- -->'], 1, '// starts a single-line comment.', 'easy'],
        [1, 'Preprocessor', 'Preprocessor directives begin with:', ['$', '&', '#', '@'], 2, 'Directives like #include begin with #.', 'easy'],

        [2, 'Variables', 'Which is a valid variable declaration?', ['int 2a;', 'int a2;', 'float int x;', 'var x;'], 1, 'Identifiers cannot start with digits.', 'easy'],
        [2, 'Constants', 'Keyword used to declare a constant variable:', ['fixed', 'const', 'final', 'let'], 1, 'const makes variable read-only.', 'easy'],
        [2, 'Data Types', 'Size of char in C is usually:', ['1 byte', '2 bytes', '4 bytes', '8 bytes'], 0, 'char occupies 1 byte.', 'easy'],
        [2, 'Data Types', 'Floating-point type with higher precision than float:', ['double', 'long', 'int', 'char'], 0, 'double has higher precision.', 'easy'],
        [2, 'Operators', 'Which is arithmetic operator?', ['&&', '||', '%', '>='], 2, '% is arithmetic modulus operator.', 'easy'],
        [2, 'Operators', 'Relational operator in C is:', ['==', '+=', '&=', '>>='], 0, '== compares equality.', 'easy'],
        [2, 'Operators', 'Logical AND operator is:', ['&', '&&', 'and', '||'], 1, '&& is logical AND.', 'easy'],
        [2, 'Increment', 'Post-increment of x is:', ['++x', 'x++', 'x+1+', 'x+=+'], 1, 'x++ returns old value then increments.', 'easy'],
        [2, 'Type Casting', 'Explicit type cast syntax is:', ['int(x)', '(int)x', 'x:int', 'cast int x'], 1, '(int)x performs type casting.', 'medium'],
        [2, 'Prediction', 'If int a=5; int b=a++; b becomes:', ['5', '6', '4', 'undefined'], 0, 'Post-increment assigns old value first.', 'medium'],

        [3, 'if Statement', 'Syntax of if statement is:', ['if x > 0 {}', 'if (x > 0) { }', 'if x>0 then', 'if: (x>0)'], 1, 'Condition must be in parentheses.', 'easy'],
        [3, 'if-else', 'Which chooses one of two blocks?', ['switch', 'if-else', 'for', 'while'], 1, 'if-else handles binary branching.', 'easy'],
        [3, 'Nested if', 'Nested if means:', ['Two ifs side by side', 'if inside another if', 'if with no condition', 'if with switch'], 1, 'Nested if has inner if block.', 'easy'],
        [3, 'switch', 'Expression in switch can be:', ['float only', 'string only', 'integral type', 'array'], 2, 'switch works with integral-like values.', 'medium'],
        [3, 'switch', 'Keyword to exit switch case is:', ['stop', 'exit', 'break', 'return'], 2, 'break prevents fall-through.', 'easy'],
        [3, 'switch', 'Default block in switch is:', ['optional', 'mandatory', 'not allowed', 'first case'], 0, 'default is optional fallback case.', 'easy'],
        [3, 'Conditions', 'Operator for NOT equal is:', ['!=', '<>', '~=', '!=='], 0, 'C uses != for not equal.', 'easy'],
        [3, 'Prediction', 'if(0) executes block?', ['Always', 'Never', 'Sometimes', 'Compiler error'], 1, '0 is false in C conditions.', 'medium'],
        [3, 'Syntax Errors', 'Which is invalid?', ['if(a>b){}', 'if(a>b){', 'if(a>b){ }', 'if ((a>b)) { }'], 1, 'Missing closing brace is syntax error.', 'easy'],
        [3, 'Ternary', 'Ternary operator symbol is:', ['::', '??', '?:', '->'], 2, 'Condition ? expr1 : expr2.', 'medium'],

        [4, 'for Loop', 'for loop syntax contains:', ['init, condition, update', 'condition only', 'update only', 'none'], 0, 'for has initialization, condition and update.', 'easy'],
        [4, 'while Loop', 'while loop checks condition:', ['after loop body', 'before loop body', 'never', 'twice only'], 1, 'while is entry-controlled loop.', 'easy'],
        [4, 'do-while', 'do-while checks condition:', ['before first execution', 'after executing body', 'never', 'at compile time'], 1, 'do-while is exit-controlled.', 'easy'],
        [4, 'Loop Control', 'Keyword to skip current iteration:', ['skip', 'continue', 'pass', 'next'], 1, 'continue skips to next iteration.', 'easy'],
        [4, 'Loop Control', 'Keyword to terminate loop immediately:', ['return', 'break', 'stop', 'exitloop'], 1, 'break exits nearest loop.', 'easy'],
        [4, 'Prediction', 'for(i=0;i<3;i++) prints i values count:', ['2', '3', '4', '0'], 1, 'i takes 0,1,2 -> 3 iterations.', 'medium'],
        [4, 'Nested Loops', 'Nested loops are used for:', ['single pass only', '2D patterns/grids', 'functions only', 'pointers only'], 1, 'Nested loops commonly handle matrix/pattern tasks.', 'easy'],
        [4, 'Infinite Loop', 'Which can cause infinite loop?', ['for(i=0;i<5;i++)', 'while(1)', 'do{ }while(0)', 'for(i=5;i<0;i++)'], 1, 'while(1) runs indefinitely unless broken.', 'easy'],
        [4, 'Prediction', 'int i=1; while(i<4){i++;} final i is:', ['3', '4', '5', '1'], 1, 'Loop stops when i becomes 4.', 'medium'],
        [4, 'Syntax Errors', 'Correct do-while ending is:', ['while(i<5)', 'while(i<5);', 'while i<5;', 'endwhile'], 1, 'do-while requires semicolon after condition.', 'easy'],

        [5, 'Arrays', 'Array index in C starts from:', ['1', '0', '-1', 'depends'], 1, 'C arrays are zero-indexed.', 'easy'],
        [5, 'Arrays', 'Declaration of int array of 5 elements:', ['int a;', 'int a[5];', 'array int a(5);', 'int[5] a;'], 1, 'Use square brackets with size.', 'easy'],
        [5, 'Arrays', 'Access third element of a:', ['a[3]', 'a(2)', 'a[2]', 'a{2}'], 2, 'Third element is at index 2.', 'easy'],
        [5, 'Strings', 'String in C is terminated by:', ['\\n', '\\0', 'EOF', ';'], 1, 'C strings end with null character.', 'easy'],
        [5, 'Strings', 'Header for strlen() is:', ['stdio.h', 'math.h', 'string.h', 'ctype.h'], 2, 'string.h contains string functions.', 'easy'],
        [5, 'Strings', 'Function to copy string:', ['strcopy()', 'copy()', 'strcpy()', 'memcpystr()'], 2, 'strcpy copies strings.', 'easy'],
        [5, 'Functions', 'General function prototype looks like:', ['name return(args);', 'return_type name(params);', 'function name[];', 'func:name()'], 1, 'Prototype declares return type, name and params.', 'easy'],
        [5, 'Functions', 'Function with no return value uses:', ['int', 'void', 'null', 'none'], 1, 'void indicates no returned value.', 'easy'],
        [5, 'Scope', 'Variable declared inside function has:', ['global scope', 'file scope', 'local scope', 'extern scope'], 2, 'Local variables are function-scoped.', 'easy'],
        [5, 'Prediction', 'char s[]="C"; strlen(s) is:', ['0', '1', '2', 'undefined'], 1, 'String "C" has one visible character.', 'medium'],

        [6, 'Pointers', 'A pointer stores:', ['value only', 'address of variable', 'type only', 'instruction only'], 1, 'Pointers hold memory addresses.', 'easy'],
        [6, 'Pointers', 'Address-of operator is:', ['*', '&', '%', '#'], 1, '& gets variable address.', 'easy'],
        [6, 'Pointers', 'Dereference operator is:', ['&', '*', '->', '::'], 1, '* accesses value at pointed address.', 'easy'],
        [6, 'Pointers', 'Correct declaration of pointer to int:', ['int *p;', 'pointer int p;', 'int p*;', 'ptr int p;'], 0, 'int *p declares pointer to int.', 'easy'],
        [6, 'Storage Class', 'Storage class keyword for global variable declaration in another file:', ['auto', 'register', 'static', 'extern'], 3, 'extern references global defined elsewhere.', 'medium'],
        [6, 'Storage Class', 'Default storage class for local variables is:', ['static', 'extern', 'auto', 'register'], 2, 'Local variables are auto by default.', 'medium'],
        [6, 'Storage Class', 'static local variable retains value between calls?', ['No', 'Yes', 'Only in loops', 'Only with pointers'], 1, 'static locals persist across function calls.', 'medium'],
        [6, 'Preprocessor', 'Macro definition uses:', ['#define', '#include', '#ifdef', '#pragma'], 0, '#define creates macros.', 'easy'],
        [6, 'Preprocessor', 'Conditional compilation directive is:', ['#switch', '#if', '#loop', '#main'], 1, '#if enables conditional compilation.', 'medium'],
        [6, 'Error Finding', 'Find error: int x=10 printf("%d",x);', ['No error', 'Missing semicolon after 10', 'printf cannot print int', 'x should be float'], 1, 'Semicolon is missing after declaration.', 'easy'],

        [1, 'Output Prediction', 'Output of printf("%d", 5/2); is:', ['2.5', '2', '3', '5'], 1, 'Integer division truncates fraction.', 'medium'],
        [2, 'Output Prediction', 'int x=3; printf("%d", ++x); output:', ['3', '4', '2', 'undefined'], 1, 'Pre-increment updates before use.', 'medium'],
        [3, 'Output Prediction', 'int x=0; if(x) printf("A"); else printf("B"); prints:', ['A', 'B', 'AB', 'Nothing'], 1, '0 is false so else branch runs.', 'medium'],
        [4, 'Output Prediction', 'for(i=1;i<=3;i++) printf("*"); output length:', ['2', '3', '4', '1'], 1, 'Loop runs three times.', 'easy'],
        [5, 'Output Prediction', 'char s[]="HI"; printf("%c", s[1]); prints:', ['H', 'I', '0', 'Error'], 1, 'Index 1 is second character I.', 'easy'],
        [6, 'Output Prediction', 'int x=7; int *p=&x; printf("%d", *p); prints:', ['address', '7', '0', 'garbage'], 1, '*p gives value at x.', 'easy'],
        [2, 'Syntax', 'Valid identifier is:', ['float', '2num', '_count', 'int-main'], 2, 'Identifiers may start with underscore.', 'easy'],
        [3, 'switch', 'switch without break causes:', ['compile error', 'fall-through', 'infinite loop', 'none'], 1, 'Execution falls through next cases.', 'medium'],
        [4, 'Loops', 'Which loop executes at least once?', ['for', 'while', 'do-while', 'none'], 2, 'do-while executes body before condition check.', 'easy'],
        [5, 'Functions', 'Arguments passed by default in C are:', ['by reference', 'by pointer', 'by value', 'by object'], 2, 'C uses pass-by-value semantics.', 'medium'],
        [6, 'Pointers', 'NULL pointer means:', ['points to 0th element', 'uninitialized always', 'points to no valid location', 'points to stack top'], 2, 'NULL means no valid target.', 'medium'],
        [1, 'Header Files', 'Header for getchar() is:', ['stdlib.h', 'stdio.h', 'ctype.h', 'string.h'], 1, 'getchar is declared in stdio.h.', 'easy'],
        [2, 'Operators', 'Bitwise AND operator is:', ['&&', '&', 'and', '%%'], 1, '& is bitwise AND.', 'medium'],
        [3, 'Conditions', 'Which is logical OR?', ['|', '||', 'or', '^|'], 1, '|| is logical OR in C.', 'easy'],
        [5, 'Strings', 'Function to compare two strings:', ['strcmp()', 'strsame()', 'compare()', 'strdiff()'], 0, 'strcmp compares two strings lexicographically.', 'easy'],
        [6, 'Preprocessor', 'Which prevents multiple inclusion of same header?', ['#repeat', '#include_once', 'include guard macros', '#pragma main'], 2, 'Include guards avoid duplicate inclusion.', 'medium']
    ];

    registerSubject({
        name: 'Programming Fundamentals (C)',
        code: 'CS102',
        description: 'Core C programming concepts, control flow, arrays, strings, functions, pointers, and preprocessor.',
        icon: 'C',
        colorTheme: { primary: '#22c55e', secondary: '#16a34a', accent: '#84cc16' },
        aiContext: 'Programming Fundamentals in C covering program structure, variables, operators, conditions, loops, arrays, strings, functions, pointers, storage classes, and preprocessor directives.',
        glossary: [
            { term: 'Compiler', def: 'Software that translates C source code into machine code.' },
            { term: 'Pointer', def: 'A variable that stores the memory address of another variable.' },
            { term: 'Array', def: 'A collection of same-type elements stored contiguously.' },
            { term: 'Function', def: 'A reusable block of code performing a specific task.' },
            { term: 'Preprocessor', def: 'Processes directives like #include and #define before compilation.' }
        ],
        units: [
            { id: 1, title: 'Introduction and Program Structure', overview: 'History, structure of C program, headers, main(), input/output basics.', subtopics: ['History', 'main()', 'Header files', 'printf', 'scanf'], estimatedTime: '3 hours', revisionTips: ['Always include stdio.h for printf/scanf.', 'Execution begins at main().'], formulas: [], notes: [] },
            { id: 2, title: 'Data Types, Variables and Operators', overview: 'Identifiers, constants, data types, arithmetic/logical/relational operators.', subtopics: ['Variables', 'Constants', 'Data types', 'Operators'], estimatedTime: '3 hours', revisionTips: ['Mind type casting in expressions.', 'Use correct format specifiers.'], formulas: [], notes: [] },
            { id: 3, title: 'Decision Making', overview: 'if, if-else, nested if, switch-case and ternary operator.', subtopics: ['if', 'if-else', 'nested if', 'switch', 'ternary'], estimatedTime: '3 hours', revisionTips: ['Use break in switch cases.', 'Conditions evaluate 0 as false.'], formulas: [], notes: [] },
            { id: 4, title: 'Loops and Control Statements', overview: 'for, while, do-while, break, continue, nested loops.', subtopics: ['for', 'while', 'do-while', 'break', 'continue'], estimatedTime: '3 hours', revisionTips: ['do-while executes at least once.', 'Check loop boundary conditions carefully.'], formulas: [], notes: [] },
            { id: 5, title: 'Arrays, Strings and Functions', overview: 'Single-dimensional arrays, string handling and function concepts.', subtopics: ['Arrays', 'Strings', 'Functions', 'Scope'], estimatedTime: '4 hours', revisionTips: ['Arrays are zero-indexed.', 'Strings end with null terminator.'], formulas: [], notes: [] },
            { id: 6, title: 'Pointers, Storage Class and Preprocessor', overview: 'Pointer basics, storage classes and macro directives.', subtopics: ['Pointers', 'auto/static/extern', 'Macros', 'Conditional compilation'], estimatedTime: '4 hours', revisionTips: ['Use & for address and * for dereference.', 'static local variables retain value.'], formulas: [], notes: [] }
        ],
        topicExplainers: {
            basics: '<strong>C Basics:</strong> Learn program skeleton, headers, and I/O using printf/scanf.',
            control: '<strong>Control Flow:</strong> Use if/switch for decisions and loops for repetition.',
            memory: '<strong>Pointers & Memory:</strong> Pointers store addresses and help in efficient data handling.'
        },
        questions: questionData.map(([unit, topic, q, opts, ans, explain, difficulty]) => ({
            unit, topic, q, opts, ans, explain, difficulty
        }))
    });
})();
