type Translation = {
    xliff: Xliff;
}

type Xliff = {
    "$": {
        version: string;
        xmlns: string;
        "_xmlns:xsi": string;
        "_xsi:schemaLocation": string;
    }
    file: FileInfo[];
}

type FileInfo = {
    "$": {
        datatype: string;
        "source-language": string;
        "target-language": string;
        original: string;
    }
    body: BodyInfo[];
}

type BodyInfo = {
    group: Group[];
}

type Group = {
    "trans-unit": TransUnit[];
    "$": {
        id: string;
    }
}

type TransUnit = {
    source: string;
    target: string;
    note: Note[];
    "$": {
        id: string;
        "size-unit": string;
        translate: string;
        "xml:space": string;
    }
}

type Note = {
    _from: string;
    _annotates: string;
    _priority: string;
    __text ? : string;
}