import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

export interface APIMemberCardProps {
  /** The name of the API member (e.g., method, property name) */
  name: string;
  /** The type of the API member */
  memberType: 'method' | 'property' | 'class' | 'function' | 'interface' | 'enum' | 'const' | 'type-alias';
  /** Optional signature for methods or functions (e.g., "(count: number) => void") */
  signature?: string;
  /** A short description of the API member */
  description: string;
  /** The URL or path to the detailed documentation for this member */
  docLink: string;
  /** Optional flag to indicate if the API member is deprecated */
  deprecated?: boolean;
}

const APIMemberCard: React.FC<APIMemberCardProps> = ({
  name,
  memberType,
  signature,
  description,
  docLink,
  deprecated = false,
}) => {
  console.log(`APIMemberCard loaded for API member: ${name}`);

  const displayMemberType = memberType.replace('-', ' ');

  return (
    <Card className="w-full shadow-sm hover:shadow-lg transition-shadow duration-200 flex flex-col h-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2 mb-2">
          <CardTitle className="text-lg md:text-xl font-semibold text-primary break-all">
            {name}
          </CardTitle>
          <div className="flex flex-col items-end xs:flex-row xs:items-center gap-2 flex-shrink-0">
            {deprecated && <Badge variant="destructive" className="whitespace-nowrap">Deprecated</Badge>}
            <Badge variant="secondary" className="capitalize whitespace-nowrap">{displayMemberType}</Badge>
          </div>
        </div>
        {signature && (
          <pre className="mt-1 text-xs sm:text-sm text-muted-foreground bg-muted/50 p-3 rounded-md overflow-x-auto">
            <code className="font-mono">{signature}</code>
          </pre>
        )}
      </CardHeader>
      <CardContent className="flex-grow pb-4">
        <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter className="pt-4 pb-4 px-6 border-t flex justify-end">
        <Button asChild variant="outline" size="sm" className="hover:bg-accent hover:text-accent-foreground">
          <Link to={docLink}>
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default APIMemberCard;