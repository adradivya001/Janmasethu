
import { useState } from "react";
import { Search, ShieldCheck, ShieldAlert, CircleSlash, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SAFETY_ITEMS } from "@/data/tools_content";

const SafetyChecker = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState(SAFETY_ITEMS);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.toLowerCase();
        setQuery(val);
        if (!val) {
            setResults(SAFETY_ITEMS);
            return;
        }
        setResults(SAFETY_ITEMS.filter(item =>
            item.name.toLowerCase().includes(val) ||
            item.category.toLowerCase().includes(val)
        ));
    };

    const getIcon = (status: string) => {
        if (status === "SAFE") return <ShieldCheck className="w-5 h-5 text-green-500" />;
        if (status === "CAUTION") return <ShieldAlert className="w-5 h-5 text-yellow-500" />;
        return <CircleSlash className="w-5 h-5 text-red-500" />;
    };

    const getColor = (status: string) => {
        if (status === "SAFE") return "bg-green-100 text-green-800 border-green-200";
        if (status === "CAUTION") return "bg-yellow-100 text-yellow-800 border-yellow-200";
        return "bg-red-100 text-red-800 border-red-200";
    };

    return (
        <Card className="w-full card-shadow rounded-3xl overflow-hidden border-t-4 border-t-blue-500">
            <CardHeader className="bg-blue-50 pb-6">
                <CardTitle className="text-xl font-bold text-blue-900 flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-blue-600" />
                    Pregnancy Safety Checker
                </CardTitle>
                <div className="relative mt-4">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-blue-400" />
                    <Input
                        placeholder="Search for foods, medicines, activities..."
                        className="pl-10 bg-white border-blue-200 focus:ring-blue-500 rounded-xl"
                        value={query}
                        onChange={handleSearch}
                    />
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="max-h-[300px] overflow-y-auto divide-y divide-gray-100">
                    {results.length > 0 ? results.map((item) => (
                        <div key={item.id} className="p-4 hover:bg-gray-50 flex items-start gap-4 transition-colors">
                            <div className={`mt-1 p-2 rounded-full ${getColor(item.status).split(' ')[0]}`}>
                                {getIcon(item.status)}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800">{item.name}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="outline" className="text-xs text-gray-500 border-gray-200">{item.category}</Badge>
                                    <Badge className={`${getColor(item.status)} border px-2 py-0.5 text-xs font-semibold uppercase`}>
                                        {item.status}
                                    </Badge>
                                </div>
                                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                                    {item.note}
                                </p>
                            </div>
                        </div>
                    )) : (
                        <div className="p-8 text-center text-gray-500">
                            <Info className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                            <p>No results found for "{query}".</p>
                            <p className="text-xs mt-1">Always consult your doctor for medical advice.</p>
                        </div>
                    )}
                </div>
                <div className="bg-gray-50 p-3 text-center border-t border-gray-100">
                    <p className="text-xs text-gray-400">
                        Disclaimer: Information provided is for educational purposes only and not medical advice.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default SafetyChecker;
